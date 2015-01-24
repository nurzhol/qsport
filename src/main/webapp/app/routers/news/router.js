/**
 * Define Require module with dependencies
 */
define([
    'jquery',
    'youtube',
    'backbone',
    'views/news/one',
    'views/news/categoryNews',
    "models/news",
    "models/category",
    'views/news/news24_27'
], function ($, youtube, Backbone, OneView, CategoryNewsView , NewsModel, CategoryModel, News24_27View ) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var Router = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            'readnews/:id': 'showNews',
            'readcat/:id': 'showCategoryNews',
            'header/:cat': 'showCategoryHeader',
            'youtubevideo': 'showTV'

        },
        // Constructor
        initialize: function () {
            this.oneView = null;
            this.categoryView = null;
            this.headerView = null;
        },


        showNews: function(id) {
            console.log("Show news " +id);
            if (!this.oneView) {
                this.oneView = new OneView();
            }

            NewsModel.url = 'data-rest/news/'+id;
            NewsModel.clear().fetch();
        },

        showCategoryNews: function(id) {
            console.log("Show categoryView " +id);
            if (!this.categoryView) {
                this.categoryView = new CategoryNewsView();
            }

            CategoryModel.url = 'data-rest/category/'+id;
            CategoryModel.fetch();
        },

        showCategoryHeader: function(cat) {
            console.log("Show headerView " +cat);
            if (!this.headerView) {
                this.headerView = new News24_27View();
            }

            this.headerView.catnum = cat
            this.headerView.initialize();

        },

        showTV :function(){
            var elem="";
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

            $(".youtube").YouTubeModal({youtubeId:youTubeId, title:youTubeTitle, autoplay:1, width:640, height:480, start:seek});
       }

    });


    // Return the view as the Require module
    return Router;
});
