/**
 * Define Require module with dependencies
 */
define([
    'jquery',
    'backbone',
    'collections/categories',
    'views/categories',
    'views/category-form',
    "models/category"
], function ($, Backbone, CategoriesCollection, CategoriesView, CategoryFormView, CategoryModel) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var Router = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            'categories': 'categories',
            'categories/add': 'addCategory',
            'categories/:page': 'categories',
            'categories/:page/:sort/:dir': 'categories'
        },
        // Constructor
        initialize: function () {
            this.categoriesView = null;
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
        }

    });


    // Return the view as the Require module
    return Router;
});
