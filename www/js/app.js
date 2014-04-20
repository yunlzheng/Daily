angular.module('ionicDaily', ['ionic'])

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

    .factory('Daily', function($http) {
        return {
            fetchLatest: function() {
                return $http.get('http://news-at.zhihu.com/api/2/news/latest');
            },
            fetchStory: function(id) {
                return $http.get('http://daily.zhihu.com/api/1.2/news/' + id)
            }

        }
    })
    .controller('NewsCtrl', function($scope, Daily) {
        $scope.showDelete = true;
        $scope.optionButtons = [
            {
                text: 'Share',
                type: 'button-calm',
                onTap: function (item) {
                    alert('Share Item: ' + item.id);
                }
            }
        ];
        Daily.fetchLatest().success(function(data) {
            $scope.news = data.news;
        }).error(function() {
            var result = JSON.parse('{"date":"20140419","news":[{"title":"把一些美剧字幕分发给爱好者众包翻译是个好点子吗？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854599","image":"http:\/\/p4.zhimg.com\/3d\/8c\/3d8c2e24f5f46c8262e1c82d60d4cc44.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854599","thumbnail":"http:\/\/p2.zhimg.com\/ee\/74\/ee741b0c1c9376ff8f25f3e4829ed3d4.jpg","ga_prefix":"041910","id":3854599},{"title":"IPTV、互联网电视、网络电视、智能电视？傻傻分不清楚","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854913","image":"http:\/\/p1.zhimg.com\/45\/69\/4569a0f414b2c85b9a5fdafec6d8bc39.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854913","thumbnail":"http:\/\/p2.zhimg.com\/18\/8b\/188bf33348619ca699ed424b643b0e0f.jpg","ga_prefix":"041909","id":3854913},{"title":"个人办网站的流程攻略：域名最好还是找国外的注册","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3841745","image":"http:\/\/p2.zhimg.com\/11\/aa\/11aacf51aab2d027bb058235fceeb2b0.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3841745","thumbnail":"http:\/\/p1.zhimg.com\/d6\/79\/d679f3aeb42660c33693145453343570.jpg","ga_prefix":"041907","id":3841745},{"title":"致职场新人：高端如金融行业也分金融高富帅和金融民工","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3851125","image":"http:\/\/p3.zhimg.com\/66\/07\/6607e46a1e4b2f8e380e6870883c59f6.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3851125","thumbnail":"http:\/\/p2.zhimg.com\/52\/91\/529113a270b9d5edafeb095d046dab97.jpg","ga_prefix":"041907","id":3851125},{"title":"致创业者：一份打动投资人的商业策划书最需要的就是逻辑","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3839536","image":"http:\/\/p3.zhimg.com\/2b\/78\/2b78ea34d2d1cedf29370a2381e2cc95.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3839536","thumbnail":"http:\/\/p1.zhimg.com\/d7\/62\/d7625805b76c1b0468a4be47362f9efd.jpg","ga_prefix":"041907","id":3839536},{"title":"我的市值一夜之间蒸发了 995 万亿，那财富去谁手里了？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3652672","image":"http:\/\/p3.zhimg.com\/be\/1c\/be1c79161e4fce7381881f7a60612961.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3652672","thumbnail":"http:\/\/p1.zhimg.com\/02\/1c\/021c03665d589cbcbb81f950c2ff1cb1.jpg","ga_prefix":"041907","id":3652672},{"title":"一周书影音","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854489","image":"http:\/\/p3.zhimg.com\/ff\/1b\/ff1bdb02251f722a051ed1cc69972886.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854489","thumbnail":"http:\/\/p2.zhimg.com\/53\/e2\/53e2fc9138350a213a7571a476841e53.jpg","ga_prefix":"041906","id":3854489},{"title":"瞎扯 · 如何正确地吐槽","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3855192","image":"http:\/\/p1.zhimg.com\/49\/d5\/49d5e4c19f8f5a898e9c04591c11277a.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3855192","thumbnail":"http:\/\/p4.zhimg.com\/70\/d8\/70d8556a879703930a70c2b08738858c.jpg","ga_prefix":"041906","id":3855192}],"is_today":true,"top_stories":[{"image_source":"《光荣岁月》","title":"把一些美剧字幕分发给爱好者众包翻译是个好点子吗？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3854599","image":"http:\/\/p4.zhimg.com\/3d\/8c\/3d8c2e24f5f46c8262e1c82d60d4cc44.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854599","ga_prefix":"041910","id":3854599},{"image_source":"Yestone.com 版权图片库","title":"致职场新人：高端如金融行业也分金融高富帅和金融民工","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3851125","image":"http:\/\/p3.zhimg.com\/66\/07\/6607e46a1e4b2f8e380e6870883c59f6.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3851125","ga_prefix":"041907","id":3851125},{"image_source":"Yestone.com 版权图片库","title":"致创业者：一份打动投资人的商业策划书最需要的就是逻辑","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3839536","image":"http:\/\/p3.zhimg.com\/2b\/78\/2b78ea34d2d1cedf29370a2381e2cc95.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3839536","ga_prefix":"041907","id":3839536},{"image_source":"《大话王》","title":"哪些行为容易得罪别人，自己却不容易察觉？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3852609","image":"http:\/\/p1.zhimg.com\/05\/45\/0545faa3531e565f8657272b9c2f114c.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3852609","ga_prefix":"041818","id":3852609},{"image_source":"blu-news.org \/ CC BY-SA","title":"停止补贴以后，嘀嘀打车的 1 亿用户会留下多少？","url":"http:\/\/daily.zhihu.com\/api\/1.2\/news\/3852393","image":"http:\/\/p4.zhimg.com\/71\/64\/716497fd2e9d8dadd20e591d4ad5f244.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3852393","ga_prefix":"041814","id":3852393}],"display_date":"2014.4.19 星期六"}');
            $scope.news = result.news;
        });
    })
    .controller('NewCtrl', function($scope, $stateParams, Daily) {
        $scope.currentStoryId = $stateParams.id;
        Daily.fetchStory($scope.currentStoryId).success(function(data) {

        }).error(function() {
            var result = JSON.parse({"body":"<div class=\"main-wrap content-wrap\">\n<div class=\"headline\">\n\n<div class=\"img-place-holder\"><\/div>\n\n\n<\/div>\n<div class=\"content-inner\">\n\n\n\n\n<div class=\"question\">\n<h2 class=\"question-title\">IPTV、互联网电视、网络电视、智能电视，这些概念有什么区别？<\/h2>\n\n<div class=\"answer\">\n\n<div class=\"meta\">\n<img class=\"avatar\" src=\"http:\/\/p1.zhimg.com\/66\/6b\/666b0abfc_is.jpg\">\n<span class=\"author\">兜风，<\/span><span class=\"bio\">科幻 互联网<\/span>\n<\/div>\n\n<div class=\"content\">\n<p>概念确实太多，太容易混乱了。把自己的理解整理了一下：<\/p>\r\n<p><strong>网络电视<\/strong><\/p>\r\n<p>题主提到的网络电视这个概念目前来看比较模糊了，参考各位的答案，我觉得应该是指 pps，pptv 这些等 pc 上运行的收看视频节目的程序。利用流媒体格式实现视频直播或者点播，通过互联网模拟&ldquo;看电视&rdquo;的功能。目前应该也不怎么流行了吧。<\/p>\r\n<p><strong>IPTV<\/strong><\/p>\r\n<ul>\r\n<li>我觉得目前国内的 IPTV 可以定义为由电信运营商（联通电信移动）主导的通过家庭宽带在专用网络中收看视频节目的电信增值服务。<\/li>\r\n<li>国内的 IPTV 现状是：运营主体都是电信运营商（电信、联通等）。由电信运营商发展用户。拥有 IPTV 播控牌照的几家内容播控方（上海百视通、杭州华数、CNTV 等）为主在背后提供视频节目的制作、上传、编排推荐等，包括一些技术支持。<\/li>\r\n<li>IPTV 更多作为电信运营商们家用宽带的附加产品。和家庭宽带、家用电话等产品打包销售。<\/li>\r\n<li>在最初的 IPTV 整体设计时，所有 IPTV 机顶盒一般都只能连接服务专用的网络，无法访问公共互联网。<\/li>\r\n<li>而且机顶盒大多低配置，用 linux 系统。用户只能通过内置的电子节目菜单（EPG）点播视频，也可以收看直播（也许是 IPTV 专网让政策在这一块顾虑较少）。因此目前市面上的 IPTV 还是以点播视频，收看 \/ 回看直播为主。IPTV 平台也并不是一个开放平台。<\/li>\r\n<li>IPTV 在很多地方先于智能电视一步为人所知。他实现了直播中暂停、快退，回看几天前节目，点播节目、快进快退等等这些互动性甩传统电视 N 条街的功能。<\/li>\r\n<\/ul>\r\n<p><strong>智能电视 \/ 互联网电视机（互联网机顶盒）<\/strong><\/p>\r\n<ul>\r\n<li>个人觉得这些是同一种概念。本质都是智能的操作系统，开放的平台。对各种内容生产者、技术互联网企业来说，他就是在 PC、手机、平板之外的另一张巨大的屏幕，一个摆放在客厅的设备。<\/li>\r\n<li>不同企业的出发点不同，电视机生产商可能希望强调自己生产出了&ldquo;智能&rdquo;的电视，好比手机生产商推出了&rdquo;智能&ldquo;手机。互联网企业如乐视小米可能就喊出了&rdquo;互联网&ldquo;电视机的口号，强调自己的精神和属性。<\/li>\r\n<li>智能电视 \/ 互联网电视大多数都希望把用户看电视向用电视转变。除了视频节目外，游戏、互动教育、家庭娱乐等等都有很大的发展空间。比如浏览相册、播放音乐、视频通话、各种游戏、家庭 KTV 啊神马的。<\/li>\r\n<li>跟 IPTV 相比，智能电视 \/ 互联网电视是能通过安装的应用访问公共互联网的。只不过据我所知国内的政策，不论是智能电视还是互联网电视机（互联网机顶盒）都要求牌照持有者进行平台的全面管控，也就是说由牌照拥有者来管理、审核发布<strong>视频内容<\/strong>和<strong>所有 APP<\/strong>。【视频直播也是不太明朗的一块。目前政策上可能还是很模糊，所以各家也都是小心翼翼的试探这一领域。（比如开通体育比赛的直播，转接权威电视台的信号等等。）当然除了大型事件比如体育赛事、晚会、突发新闻神马的直播的需求也不是特别大，智能系统能做的事情毕竟已经很多了。】<\/li>\r\n<\/ul>\n<\/div>\n<\/div>\n\n\n<div class=\"view-more\"><a href=\"http:\/\/www.zhihu.com\/question\/20650039\">查看知乎讨论<span class=\"js-question-holder\"><\/span><\/a><\/div>\n\n<\/div>\n\n\n<\/div>\n<\/div>","image_source":"x.Rain.z \/ CC BY-ND","title":"IPTV、互联网电视、网络电视、智能电视？傻傻分不清楚","image":"http:\/\/p1.zhimg.com\/45\/69\/4569a0f414b2c85b9a5fdafec6d8bc39.jpg","share_url":"http:\/\/daily.zhihu.com\/story\/3854913","js":[],"thumbnail":"http:\/\/p2.zhimg.com\/18\/8b\/188bf33348619ca699ed424b643b0e0f.jpg","ga_prefix":"041909","id":3854913,"css":["http:\/\/news.at.zhihu.com\/css\/news_qa.4.css?v=4edde"]});

            console.log(result);
        });

    });