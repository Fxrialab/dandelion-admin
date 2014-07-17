angular.module('dandelionAdminApp')
        .factory('userService', function($http) {
    return {
        findAll: function() {
            return $http.post(options.api.base_url + 'users');
        },
        findByPk: function(id) {
            return $http.get(options.api.base_url + 'user?id=' + id);
        },
        status: function(id) {
            var data = {id: id};
            return $http.post(options.api.base_url + 'status', data);
        }
    }
})
        .factory('postService', function($http) {
    return {
        findAll: function(id) {
            var data = {id: id};
            return $http.post(options.api.base_url + 'posts', data);
        },
    }
})
        .factory('commentService', function($http) {
    return {
        findAll: function(id) {
            var data = {id: id};
            return $http.post(options.api.base_url + 'comments', data);
        },
    }
})

        .factory('photoService', function($http) {
    return {
        findAll: function(id) {
            console.log(id);
            var data = {id: id};
            return $http.post(options.api.base_url + 'photos', data);
        },
    }
})