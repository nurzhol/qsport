/**
 * Define Require module with dependencies
 */
define([
    'jquery',
    'backbone',
    'views/news/one',
    'views/news/categoryNews',
    "models/news",
    "models/category"
], function ($, Backbone, OneView, CategoryNewsView , NewsModel, CategoryModel ) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var Router = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            'readnews/:id': 'showNews',
            'readcat/:id': 'showCategoryNews'

        },
        // Constructor
        initialize: function () {
            this.oneView = null;
            this.categoryView = null;
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
        }

    });


    // Return the view as the Require module
    return Router;
});
