app.controller('listThemeCtrl', function($scope, ngTableParams, Data, $cookieStore, $dialogs, $modal, $rootScope) {
    getData();
    /**
     * Comment
     */
    function getData() {
        Data.get('themes').then(function(response) {
            $scope.data = response;
            var data = response;
            $scope.tableParams = new ngTableParams({
                page: 1, // show first page
                count: 20          // count per page
            }, {
                total: data.length, // length of data
                getData: function($defer, params) {
                    $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });
    }

    $scope.install = function(data) {
        Data.get('install?id=' + data).then(function(results) {
            var data = results;
        });
    };
    $scope.remove = function(item) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/comfirm.html',
            controller: 'comfirmCtrl',
            resolve: {
                deleteItem: function() {
                    return item;
                }
            }
        });
        modalInstance.result.then(function() {
            reallyDelete(item);
        });
    };
    var reallyDelete = function(item) {
        Data.get('remove?id=' + item + '&token=' + $cookieStore.get('token'), function(response) {
            if (response.success == 'true')
                $('.theme_' + response.id).remove();
        });

    };


    $scope.detail = function(id) {
        var modalInstance = $modal.open({
            templateUrl: 'partials/themes/viewdetail.html',
            controller: 'detailThemeCtrl',
            resolve: {
                listItem: function() {
                    return Data.get('detailTheme?id=' + id + '&token=' + $cookieStore.get('token'));
                }
            }
        });
    }

});


app.controller('detailThemeCtrl', function($scope, $rootScope, ngTableParams, Data, $cookieStore, $modalInstance, $routeParams, listItem) {
    $rootScope.listItem = listItem;
    $scope.cancel = function() {
        $modalInstance.dismiss('canceled');
    }; // end cancel
});
app.controller('downloadThemeCtrl', function($scope, ngTableParams, Data, $cookieStore) {
    Data.get('themes').then(function(response) {
        $scope.data = response;
        var data = response;
        $scope.tableParams = new ngTableParams({
            page: 1, // show first page
            count: 20          // count per page
        }, {
            total: data.length, // length of data
            getData: function($defer, params) {
                $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    });
    $scope.buynow = function(item) {
        Data.get('buynow?id=' + item + '&token=' + $cookieStore.get('token'), function(response) {
            if (response == 'true')
                $('.theme_' + item).remove();
        });
    }
});

app.controller('UploadCtrl',
        function($scope, $http, $filter, $window, $cookieStore, Data) {

            $scope.options = {
                url: 'api/upload',
            };
            $scope.file = function() {
                var data = {
                    token: $cookieStore.get('token'),
                    name: $scope.queue.title,
                    file_name: $scope.queue.filename,
                    file_size: $scope.queue.filesize,
                    description: $scope.queue.description
                };
                Data.post('saveTheme', data).then(function(results) {
                    Data.toast(results);

                });
            };
        }
);
app.controller('FileDestroyCtrl', function($scope, $http, $cookieStore, Data) {
    var file = $scope.file,
            state;
    if (file.url) {
        file.$state = function() {
            return state;
        };
        file.$destroy = function() {
            state = 'pending';
            Data.url('deleteFile?file=' + file.file_name + '&token=' + $cookieStore.get('token')).then(
                    function() {
                        state = 'resolved';
                        $scope.clear(file);
                    },
                    function() {
                        state = 'rejected';
                    }
            );
        };
    } else if (!file.$cancel && !file._index) {
        file.$cancel = function() {
            $scope.clear(file);
        };
    }
});