angular.module('dandelionAdminApp')
        .factory('searchService', function($http) {
    return {
        advancedSearch: function(k, user, comment, post, from, to) {
            var data = {
                keyword: k,
                user: user,
                post: post,
                comment: comment,
                from: from,
                to: to
            };
            return $http.post(options.api.base_url + 'advancedSearch', data);
        }
    }
})