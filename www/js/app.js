angular.module('ionicDaily', ['ionic'])
    
    .config(['$httpProvider', function($httpProvider) {
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.headers.common = 'Content-Type: application/json';
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
        }
    ])

    .config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('daily', {
                url: "/daily",
                abstract: true,
                templateUrl: "templates/main.html"
            })
            .state('daily.news', {
                url: "/news",
                views: {
                    'dailyContent' :{
                        templateUrl: "templates/news.html",
                        controller: "NewsCtrl"
                    }
                }
            })
            .state('daily.new', {
                url: "/news/:id",
                views: {
                    'dailyContent' :{
                        templateUrl: "templates/new.html",
                        controller: "NewCtrl"
                    }
                }
            });

            $urlRouterProvider.otherwise("/daily/news");
    })

    .value('storageKey', 'dailys')

    .factory('Dailys', function($http, storageKey) {

        function getTitle(item) {
            return item.is_today? '今日热点': item.date;
        }

        function generateNew(news) {
            var newsWithDivider = [];
            angular.forEach(news, function(item) {

                newsWithDivider.push({'title': getTitle(item), 'isDivider': true, 'is_today': item.is_today});
                angular.forEach(item.news, function(inew){
                    inew.isDivider=false;
                    newsWithDivider.push(inew);
                })

            });
            return newsWithDivider;
        }

        return {
            all: function() {
                var news = window.localStorage[storageKey];
                if(news) {
                    return generateNew(angular.fromJson(news));
                }
                return [];
            },
            before: function() {
                var news = window.localStorage[storageKey];
                if(news) {
                    var news = angular.fromJson(news);
                    return news[news.length-1];
                }
            },
            storage: function() {
                var news = window.localStorage[storageKey];
                if (news) {
                    return angular.fromJson(news);
                }
                return [];
            },
            clean: function() {
                //window.localStorage.removeItem(storageKey);
            },
            saveAll: function(news) {
                window.localStorage['dailys'] = angular.toJson(news);
            },
            fetchLatest: function() {
                return $http.get('http://news-at.zhihu.com/api/1.2/news/latest');
            },
            fetchBeforeDay: function(before) {
                return $http.get('http://daily.zhihu.com/api/1.2/news/before/' + before);
            },
            fetchStory: function(id) {
                return $http.get('http://daily.zhihu.com/api/2/news/' + id)
            }
        }

    }) 

    .controller('NewsCtrl', function($scope, $timeout, Dailys) {

        /**
         * Fetch data for localStorage
         * */
        $scope.dailys = [];
        $scope.storage = [];

        Dailys.clean();

        $scope.showOutline = false;

        /**
         * News list option buttons
         * */
        $scope.optionButtons = [
            {
                text: 'Share',
                type: 'button-calm',
                onTap: function (item) {
                    alert('Share Item: ' + item.id);
                }
            }
        ];

        /**
         * New pull refresh
         * */
        $scope.doRefresh = function() {
            fetchLatest();
        };

        /**
        * Scroll refresh 
        */
        $scope.loadBefore = function() {
            var before = Dailys.before();
            if(before != undefined){
                Dailys.fetchBeforeDay(before.date).success(function(data){
                   storageDailyAndCompleteScrollFresh(data);
                });
                scrollComplete();
            }
        }

        /**
         * Let Scroll refresh complete.
         * */
        function scrollComplete() {
            $timeout( function() {
                $scope.$broadcast('scroll.infiniteScrollComplete');
            }, 1000);
        }

        /**
         * Let Pull refresh complete.
         * */
        function refrshComplete() {
            $timeout( function() {
                $scope.$broadcast('scroll.refreshComplete');
            }, 1000);
        }

        /**
         * Fetch today latest news
         * */
        function fetchLatest() {
            Dailys.fetchLatest().success(function(data) {
                storeDailyAndCompleteFresh(data);
            }).error(function() {
                var result = JSON.parse('{"date":"20140419","news":[{"title":"把一些美剧字幕分发给爱好者众包翻译是个好点子吗？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854599","image":"http:\/\/p4.zhimg.com\/3d\/8c\/3d8c2e24f5f46c8262e1c82d60d4cc44.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854599","thumbnail":"http:\/\/p2.zhimg.com\/ee\/74\/ee741b0c1c9376ff8f25f3e4829ed3d4.jpg","ga_prefix":"041910","id":3854599},{"title":"IPTV、互联网电视、网络电视、智能电视？傻傻分不清楚","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854913","image":"http:\/\/p1.zhimg.com\/45\/69\/4569a0f414b2c85b9a5fdafec6d8bc39.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854913","thumbnail":"http:\/\/p2.zhimg.com\/18\/8b\/188bf33348619ca699ed424b643b0e0f.jpg","ga_prefix":"041909","id":3854913},{"title":"个人办网站的流程攻略：域名最好还是找国外的注册","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3841745","image":"http:\/\/p2.zhimg.com\/11\/aa\/11aacf51aab2d027bb058235fceeb2b0.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3841745","thumbnail":"http:\/\/p1.zhimg.com\/d6\/79\/d679f3aeb42660c33693145453343570.jpg","ga_prefix":"041907","id":3841745},{"title":"致职场新人：高端如金融行业也分金融高富帅和金融民工","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3851125","image":"http:\/\/p3.zhimg.com\/66\/07\/6607e46a1e4b2f8e380e6870883c59f6.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3851125","thumbnail":"http:\/\/p2.zhimg.com\/52\/91\/529113a270b9d5edafeb095d046dab97.jpg","ga_prefix":"041907","id":3851125},{"title":"致创业者：一份打动投资人的商业策划书最需要的就是逻辑","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3839536","image":"http:\/\/p3.zhimg.com\/2b\/78\/2b78ea34d2d1cedf29370a2381e2cc95.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3839536","thumbnail":"http:\/\/p1.zhimg.com\/d7\/62\/d7625805b76c1b0468a4be47362f9efd.jpg","ga_prefix":"041907","id":3839536},{"title":"我的市值一夜之间蒸发了 995 万亿，那财富去谁手里了？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3652672","image":"http:\/\/p3.zhimg.com\/be\/1c\/be1c79161e4fce7381881f7a60612961.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3652672","thumbnail":"http:\/\/p1.zhimg.com\/02\/1c\/021c03665d589cbcbb81f950c2ff1cb1.jpg","ga_prefix":"041907","id":3652672},{"title":"一周书影音","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854489","image":"http:\/\/p3.zhimg.com\/ff\/1b\/ff1bdb02251f722a051ed1cc69972886.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854489","thumbnail":"http:\/\/p2.zhimg.com\/53\/e2\/53e2fc9138350a213a7571a476841e53.jpg","ga_prefix":"041906","id":3854489},{"title":"瞎扯 · 如何正确地吐槽","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3855192","image":"http:\/\/p1.zhimg.com\/49\/d5\/49d5e4c19f8f5a898e9c04591c11277a.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3855192","thumbnail":"http:\/\/p4.zhimg.com\/70\/d8\/70d8556a879703930a70c2b08738858c.jpg","ga_prefix":"041906","id":3855192}],"is_today":true,"top_stories":[{"image_source":"《光荣岁月》","title":"把一些美剧字幕分发给爱好者众包翻译是个好点子吗？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854599","image":"http:\/\/p4.zhimg.com\/3d\/8c\/3d8c2e24f5f46c8262e1c82d60d4cc44.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854599","ga_prefix":"041910","id":3854599},{"image_source":"Yestone.com 版权图片库","title":"致职场新人：高端如金融行业也分金融高富帅和金融民工","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3851125","image":"http:\/\/p3.zhimg.com\/66\/07\/6607e46a1e4b2f8e380e6870883c59f6.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3851125","ga_prefix":"041907","id":3851125},{"image_source":"Yestone.com 版权图片库","title":"致创业者：一份打动投资人的商业策划书最需要的就是逻辑","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3839536","image":"http:\/\/p3.zhimg.com\/2b\/78\/2b78ea34d2d1cedf29370a2381e2cc95.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3839536","ga_prefix":"041907","id":3839536},{"image_source":"《大话王》","title":"哪些行为容易得罪别人，自己却不容易察觉？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3852609","image":"http:\/\/p1.zhimg.com\/05\/45\/0545faa3531e565f8657272b9c2f114c.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3852609","ga_prefix":"041818","id":3852609},{"image_source":"blu-news.org \/ CC BY-SA","title":"停止补贴以后，嘀嘀打车的 1 亿用户会留下多少？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3852393","image":"http:\/\/p4.zhimg.com\/71\/64\/716497fd2e9d8dadd20e591d4ad5f244.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3852393","ga_prefix":"041814","id":3852393}],"display_date":"2014.4.19 星期六"}');
                storeDailyAndCompleteFresh(result);
            });
        }

        function storageDailyAndCompleteScrollFresh(data) {
            replaceOrPushInLocal(data);
            Dailys.saveAll($scope.storage);
            $scope.dailys = Dailys.all();
        }

        function storeDailyAndCompleteFresh(data) {
            
            replaceOrPushInLocal(data);
            Dailys.saveAll($scope.storage);
            $scope.dailys = Dailys.all();
            refrshComplete();
        }

        /**
        * Check if data already existed replace or push in localStorage
        */
        function replaceOrPushInLocal(data) {
            var replaced = false;
            angular.forEach($scope.storage, function(item) {
                if(item.date==data.date){
                    replaced = true;
                    $scope.storage[$scope.storage.indexOf(item)]=data;
                }
            });
            if(!replaced){
                $scope.storage.push(data);
            }
        }
        
        fetchLatest();

    })
    .controller('NewCtrl', function($scope, $stateParams, Dailys) {
        $scope.showOutline = true;
        $scope.currentStoryId = $stateParams.id;
        Dailys.fetchStory($scope.currentStoryId).success(function(data) {
            $scope.data = data;
        }).error(function() {

        });

    });