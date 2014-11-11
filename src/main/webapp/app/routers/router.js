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
    "models/news",
    "models/user",
    'collections/users',
    'views/users',
    'views/user-form'
], function ($, Backbone, CategoriesCollection, CategoriesView, CategoryFormView, CategoryModel, NewsCollection, NewsView, NewsFormView, NewsModel,UserModel, UsersCollection, UsersView, UserFormView) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var Router = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            'users/add': 'addUser',
            'users/edit/:id': 'editUser',
            'users': 'users',
            'users/:page': 'users',
            'users/:page/:sort/:dir': 'users',

            'categories/add': 'addCategory',
            'categories/edit/:id': 'editCategory',
            'categories': 'categories',
            'categories/:page': 'categories',
            'categories/:page/:sort/:dir': 'categories',

            'news/add': 'addNews',
            'news/edit/:id': 'editNews',
            'news': 'news',
            'news/:page': 'news',
            'news/:page/:sort/:dir': 'news'

        },
        // Constructor
        initialize: function () {
            this.usersView = null;
            this.categoriesView = null;
            this.newsView = null;
        },

        users: function (page, sort, dir) {
            console.log("router categories ", page, sort, dir);
            if (!this.usersView) {
                this.usersView = new UsersView();
            }
            if (!page) {
                page = 1;
            }
            UsersCollection.page = page;
            UsersCollection.sort = sort;
            UsersCollection.dir = dir;
            UsersCollection.fetchPage();
        },

        addUser: function() {
            console.log("Adding user " );
            UserModel.urlRoot = 'data-rest/user';
            UserModel.clear().set(UserModel.defaults);
            new UserFormView({model: UserModel});
        },

        editUser: function(id) {
            console.log("Editing user " +id);
            UserModel.urlRoot = 'data-rest/user/'+id;
            UserModel.fetch().done(function () {
                (new UserFormView({model: UserModel})).editForm = true;
            });
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
            console.log("Adding category " );
            CategoryModel.urlRoot = 'data-rest/category';
            CategoryModel.clear().set(CategoryModel.defaults);
            new CategoryFormView({model: CategoryModel});
        },

        editCategory: function(id) {
            console.log("Editing category " +id);
            CategoryModel.urlRoot = 'data-rest/category/'+id;
            CategoryModel.fetch().done(function () {
                (new CategoryFormView({model: CategoryModel})).editForm = true;
            });
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
            console.log("Adding news " );
            NewsModel.urlRoot = 'data-rest/news';
            NewsModel.clear().set(NewsModel.defaults);
            new NewsFormView({model:  NewsModel });
        },

        editNews: function(id) {
            console.log("Editing news " +id);
            NewsModel.urlRoot = 'data-rest/news/'+id;
            NewsModel.fetch().done(function () {
                (new NewsFormView({model: NewsModel})).editForm = true;
            });
        }


    });


    // Return the view as the Require module
    return Router;
});
