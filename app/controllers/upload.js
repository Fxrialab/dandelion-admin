
Dandelion.controller('UploadThemeCtrl',
        function($scope, $http, $filter, $window, $cookieStore, Data) {
            $scope.options = {
                url: 'api/uploadTheme',
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
Dandelion.controller('UploadPluginCtrl',
        function($scope, $http, $filter, $window, $cookieStore, Data) {
            $scope.options = {
                url: 'api/uploadPlugin',
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
Dandelion.controller('FileDestroyCtrl', function($scope, $http, $cookieStore, Data) {
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