/**
 * Define Require module with dependencies
 */
define([
    'jquery',
    'youtube',
    'backbone',
    'views/news/one',
    'views/news/categoryNews',
    'views/news/categoryBatchNews',
    'views/news/pdfNews',
    "models/news",
    "models/category",
    "models/pdf",
    'views/news/news24_27',
    'collections/news/fotonews',
    'views/news/news10',
    'collections/news/aihoinews',
    'views/news/news12',
    'collections/news/cat17news',
    'views/news/news17',
    'collections/news/ruennews',
    'collections/news/ruennewspage',
    'views/news/categoryRuNews',
    'views/news/news28',
    'views/news/news18_1',
    'collections/news/blognews',
    'views/news/news13',
    'views/news/news13_1'
], function ($, youtube, Backbone, OneView, CategoryNewsView,  CategoryBatchNewsView, PdfNewsView, NewsModel, CategoryModel, PdfModel, News24_27View, FotoNewsCollection, FotoNewsView, AoHoiNewsCollection, AiHoiNewsView, Cat17NewsCollection, Cat17NewsView, RuEnNewsCollection, RuEnNewsCollectionPagable, CategoryRuNewsView, News28View, News18_1View, BlogNewsCollection, InfographicatView, DemativatorView) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var Router = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            '': 'index',
            'readnews/:id': 'showNews',
            'readcat/:id': 'showCategoryNews',
            'readbatchcat': 'showCategoryBatchNews',

            'readpdf': 'showPdfNews',

            'infographica': 'infographica',

            'demativator': 'demativator',

            'readshort': 'showRuEnShortNews',
            'readshort/:lang': 'showRuEnShortNews',

            'readruencat': 'showRuEnCategoryNews',
            'readruencat/:lang': 'showRuEnCategoryNews',

            'header/:cat': 'showCategoryHeader',
            'youtubevideo': 'showTV',

            'fotonews/:page': 'fotonews',
            'aihoinews/:page': 'aihoinews',
            'blognews/:page': 'blognews',

            'changecat17/:catName': 'changecat17',
            'changecat17/:catName/:page': 'changecat17'
        },
        // Constructor
        initialize: function () {
            this.oneView = null;
            this.categoryView = null;
            this.categoryBatchView = null;
            this.pdfView = null;
            this.categoryRuEnView = null;
            this.headerView = null;
            this.fotonewsView = null;
            this.aihoinewsView = null;
            this.bloginewsView = null;
            this.changecat17View = null;
            this.cat28View = null;
        },

        index: function(){
            this.index0();
            $('html,body').scrollTop(0);
        },

        index0: function(){
            $(".newscontent").hide();
            $(".maincontent").show();
        },

        infographica: function(){
            this.index0();
            new InfographicatView();
        },

        demativator: function(){
            this.index0();
            new DemativatorView();
        },

        showNews: function (id) {
            console.log("Show news " + id);
            if (!this.oneView) {
                this.oneView = new OneView();
            }

            NewsModel.url = 'data-rest/news/' + id;
            NewsModel.clear().fetch();
        },

        showCategoryNews: function (id) {
            console.log("Show categoryView " + id);
            if (!this.categoryView) {
                this.categoryView = new CategoryNewsView();
            }

            CategoryModel.url = 'data-rest/category/' + id;
            CategoryModel.clear().fetch();
        },

        showCategoryBatchNews: function () {
            console.log("showCategoryBatchNews " );
            if (!this.categoryBatchView) {
                this.categoryBatchView = new CategoryBatchNewsView();
            }
            this.categoryBatchView.render();
        },

        showPdfNews: function () {
            console.log("Show pdfView " );
            if (!this.pdfView) {
                this.pdfView = new PdfNewsView();
            }

            PdfModel.url = 'data-rest/pdf';
            PdfModel.clear().fetch();
        },

        showRuEnCategoryNews: function (lang) {
            console.log("Show categoryRuEnView " + lang);
            if (!this.categoryRuEnView) {
                this.categoryRuEnView = new CategoryRuNewsView();
            }

            if (!lang)
                lang = 'zz';

            var self =this;
            RuEnNewsCollection.url = 'data-rest/news/search/findByLang?lang=' + lang;
            RuEnNewsCollection.reset().fetch().done(function(){
                self.categoryRuEnView.render();
            });
        },

        showRuEnShortNews: function (lang) {
            this.index0();
            console.log("Show News28View " + lang);
            if (!this.cat28View) {
                this.cat28View = new News28View();
            }

            if (!lang)
                lang = 'zz';

            RuEnNewsCollectionPagable.page = 1;
            RuEnNewsCollectionPagable.sort = "createDate";
            RuEnNewsCollectionPagable.dir = "desc";
            RuEnNewsCollectionPagable.limit = 9;
            RuEnNewsCollectionPagable.url = 'data-rest/news/search/findByLangByPage?lang=' + lang;
            RuEnNewsCollectionPagable.fetchPage();
        },

        showCategoryHeader: function (cat) {
            console.log("Show headerView " + cat);
            if (!this.headerView) {
                this.headerView = new News24_27View();
            }

            this.headerView.catnum = cat
            this.headerView.initialize();

        },

        showTV: function () {
            var elem = "";
            $.ajax({
                type: "POST",
                url: "rest/video/elem",
                async: false,
                success: function (resp) {

                    elem = resp;
                }
            });

            $(".youtube").empty();
            var youTubeId = '-------';
            var youTubeTitle = 'ОНЛАЙН ВИДЕО';
            var seek = 0;
            if (elem.length != 0) {
                var elems = elem.split(';');
                youTubeId = elems[0];
                seek = elems[1];
            }

            $(".youtube").YouTubeModal({youtubeId: youTubeId, title: youTubeTitle, autoplay: 1, width: 640, height: 480, start: seek});
        },


        fotonews: function (page) {
            this.index0();
            console.log("router fotonews ", page);
            if (!this.fotonewsView) {
                this.fotonewsView = new FotoNewsView();
            }
            if (!page) {
                page = 1;
            }
            FotoNewsCollection.page = page;
            FotoNewsCollection.sort = "createDate";
            FotoNewsCollection.dir = "desc";
            FotoNewsCollection.limit = 3;
            FotoNewsCollection.fetchPage();
        },

        aihoinews: function (page) {
            this.index0();
            console.log("router aihoinews ", page);
            if (!this.aihoinewsView) {
                this.aihoinewsView = new AiHoiNewsView();
            }
            if (!page) {
                page = 1;
            }
            AoHoiNewsCollection.page = page;
            AoHoiNewsCollection.sort = "createDate";
            AoHoiNewsCollection.dir = "desc";
            AoHoiNewsCollection.limit = 3;
            AoHoiNewsCollection.fetchPage();
        },

        blognews: function (page) {
            this.index0();
            console.log("router bloginews ", page);
            if (!this.bloginewsView) {
                this.bloginewsView = new News18_1View();
            }
            if (!page) {
                page = 1;
            }
            BlogNewsCollection.page = page;
            BlogNewsCollection.sort = "createDate";
            BlogNewsCollection.dir = "desc";
            BlogNewsCollection.limit = 1;
            BlogNewsCollection.fetchPage();
        },

        changecat17: function (catName, page) {
            this.index0();
            console.log("router changecat17 %s and %s", catName, page);
            if (!this.changecat17View) {
                this.changecat17View = new Cat17NewsView();
            }
            if (!page) {
                page = 1;
            }
            Cat17NewsCollection.cat17 = catName;
            Cat17NewsCollection.page = page;
            Cat17NewsCollection.url = 'data-rest/news/search/findByCategoryNameByPage?categoryName=' + catName + '&lang=kz';
            Cat17NewsCollection.sort = "createDate";
            Cat17NewsCollection.dir = "desc";
            Cat17NewsCollection.limit = 1;
            Cat17NewsCollection.fetchPage();
        }
    });


    // Return the view as the Require module
    return Router;
});
