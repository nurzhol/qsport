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
    'views/user-form',
    'views/image'
], function ($, Backbone, CategoriesCollection, CategoriesView, CategoryFormView, CategoryModel, NewsCollection, NewsView, NewsFormView, NewsModel, UserModel, UsersCollection, UsersView, UserFormView, ImageView) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var Router = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            'news/addImage': 'addImage',


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
            this.usersFormView = null;
            this.categoryFormView = null;
            this.newsFormView = null;
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

        addUser: function () {
            console.log("Adding user ");

            if (!this.usersFormView) {
                this.usersFormView = new UserFormView();
            }

            this.usersFormView.editBtn = false;
            UserModel.url = 'data-rest/user';
            UserModel.id = undefined;
            UserModel.clear().set(UserModel.defaults);
        },

        editUser: function (id) {
            console.log("Editing user " + id);
            if (!this.usersFormView) {
                this.usersFormView = new UserFormView();
            }

            this.usersFormView.editBtn = true;
            UserModel.url = 'data-rest/user/' + id;
            UserModel.fetch();
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

        addCategory: function () {
            console.log("Adding category ");

            if (!this.categoryFormView) {
                this.categoryFormView = new CategoryFormView();
            }

            this.categoryFormView.editBtn = false;
            CategoryModel.url = 'data-rest/category';
            CategoryModel.id = undefined;
            CategoryModel.set(CategoryModel.defaults);
        },

        editCategory: function (id) {
            if (!this.categoryFormView) {
                this.categoryFormView = new CategoryFormView();
            }

            this.categoryFormView.editForm = true;
            console.log("Editing category " + id);
            CategoryModel.url = 'data-rest/category/' + id;
            CategoryModel.fetch();
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

        addNews: function () {
            console.log("Adding news ");

            if (!this.newsFormView) {
                this.newsFormView = new NewsFormView();
            }

            this.newsFormView.editForm = false;
            NewsModel.url = 'data-rest/news';
            NewsModel.id = undefined;
            NewsModel.clear().set(NewsModel.defaults);
        },

        addImage: function () {
            console.log("Adding images ");
            new ImageView();


        },

        editNews: function (id) {
            console.log("Editing news " + id);

            if (!this.newsFormView) {
                this.newsFormView = new NewsFormView();
            }
            this.newsFormView.editForm = true;
            NewsModel.url = 'data-rest/news/' + id;
            NewsModel.fetch();
        }


    });


    // Return the view as the Require module
    return Router;
});
