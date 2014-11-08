/**
 * Define Require module with dependencies
 */
define([
    'jquery',
    'backbone',
    'collections/categories',
    'views/categories',
    'views/category-form',
    "models/category",
    'collections/news',
    'views/news',
    'views/news-form',
    "models/news"
], function ($, Backbone, CategoriesCollection, CategoriesView, CategoryFormView, CategoryModel, NewsCollection, NewsView, NewsFormView, NewsModel) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var Router = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            'categories/add': 'addCategory',

            'categories': 'categories',
            'categories/:page': 'categories',
            'categories/:page/:sort/:dir': 'categories',

            'news/add': 'addNews',
            'news': 'news',
            'news/:page': 'news',
            'news/:page/:sort/:dir': 'news'

        },
        // Constructor
        initialize: function () {
            this.categoriesView = null;
            this.newsView = null;
        },


        categories: function (page, sort, dir) {
            console.log("router categories ", page, sort, dir);
            if (!this.categoriesView) {
                this.categoriesView = new CategoriesView();
            }
            if (!page) {
                page = 1;
            }
            CategoriesCollection.page = page;
            CategoriesCollection.sort = sort;
            CategoriesCollection.dir = dir;
            CategoriesCollection.fetchPage();
        },

        addCategory: function() {
            new CategoryFormView({model: CategoryModel});
        },


        news: function (page, sort, dir) {
            console.log("router news ", page, sort, dir);
            if (!this.newsView) {
                this.newsView = new NewsView();
            }
            if (!page) {
                page = 1;
            }
            NewsCollection.page = page;
            NewsCollection.sort = sort;
            NewsCollection.dir = dir;
            NewsCollection.fetchPage();
        },

        addNews: function() {
            new NewsFormView({model: NewsModel});
        }

    });


    // Return the view as the Require module
    return Router;
});
