angular.module('ionicDaily', ['ionic'])
    .factory('Daily', function($http) {
        return {
            fetchLatest: function() {
                return $http.get('http://news-at.zhihu.com/api/2/news/latest');
            }
        };
    });