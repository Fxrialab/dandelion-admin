angular.module('dandelionAdminApp')
        .factory('SearchService', function($http) {
    return {
        search: function(k, comment, post, spam, unactivity, like, block) {
            var data = {
                keyword: k,
                spam: spam,
                post: post,
                comment: comment,
                unactivity: unactivity,
                like: like,
                block: block
            };
            return $http.post(options.api.base_url + 'search', data);
        },
    }
})