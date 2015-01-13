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
    'views/image',
    'collections/comments',
    'views/comments',
    'models/comment',
    'collections/videos',
    'views/video',
    'views/video-form',
    'models/video'
], function ($, Backbone, CategoriesCollection, CategoriesView, CategoryFormView, CategoryModel, NewsCollection, NewsView, NewsFormView, NewsModel, UserModel, UsersCollection, UsersView, UserFormView, ImageView, CommentsCollection, CommentsView, CommentModel, VideosCollection, VideoView, VideoFormView, VideoModel) {
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
            'news/:page/:sort/:dir': 'news',


            'comments' : 'commentsList',
            'comments/:page' : 'commentsList',
            'comments/:page/:sort/:dir' : 'commentsList',
            'comments/apply/:id' : 'commentsApply',
            'comments/reject/:id' : 'commentsReject',


            'video/edit/:id': 'editVideo',
            'video': 'video',
            'video/add': 'addVideo'


        },
        // Constructor
        initialize: function () {
            this.usersView = null;
            this.categoriesView = null;
            this.newsView = null;
            this.usersFormView = null;
            this.categoryFormView = null;
            this.newsFormView = null;
            this.commentsView = null;
            this.videoView = null;
            this.videoFormView = null;

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
                sort = "categoryName";
                dir = "asc";

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
            CategoryModel.clear().set(CategoryModel.defaults);
        },

        editCategory: function (id) {
            if (!this.categoryFormView) {
                this.categoryFormView = new CategoryFormView();
            }

            this.categoryFormView.editForm = true;
            console.log("Editing category " + id);
            CategoryModel.url = 'data-rest/category/' + id;
            CategoryModel.clear().fetch();
        },

        news: function (page, sort, dir) {
            console.log("router news ", page, sort, dir);
            if (!this.newsView) {
                this.newsView = new NewsView();
            }
            if (!page) {
                page = 1;
                sort = "createDate";
                dir = "desc";
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
            this.newsFormView.initialize();
            this.newsFormView.render("");

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
            this.newsFormView.initialize();
            this.newsFormView.render("");
            NewsModel.url = 'data-rest/news/' + id;
            NewsModel.clear().fetch();
        },

        commentsList: function (page, sort, dir) {
            console.log("router comments ", page, sort, dir);
            if (!this.commentsView) {
                this.commentsView = new CommentsView();
            }
            if (!page) {
                page = 1;
                sort = "commentDate";
                dir = "desc";
            }
            CommentsCollection.page = page;
            CommentsCollection.sort = sort;
            CommentsCollection.dir = dir;
            CommentsCollection.fetchPage();
        },


        commentsApply: function (id) {
            console.log("Apply comments " + id);


            var data = new FormData();
            data.append('commentId', id);

            $.ajax({
                url: '/rest/comment',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (data) {
                    console.log('Success!', 'CommentApplied', 'alert-success');
                },
                error: function (data) {
                    console.log('Error', 'An error occurred while apply', 'alert-error');
                    route.navigate('comments', {trigger: true});
                }
            });



        },


        commentsReject: function (id) {
            console.log("Apply comments " + id);


            var data = new FormData();
            data.append('commentId', id);

            $.ajax({
                url: '/rest/comment/delete',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (data) {
                    console.log('Success!', 'Comment deleted', 'alert-success');
                },
                error: function (data) {
                    console.log('Error', 'An error occurred while delete', 'alert-error');
                    route.navigate('comments', {trigger: true});
                }
            });

        },


        video: function (page, sort, dir) {
            console.log("router video ", page, sort, dir);
            if (!this.videoView) {
                this.videoView = new VideoView();
            }
            if (!page) {
                page = 1;
            }
            VideosCollection.page = page;
            VideosCollection.sort = sort;
            VideosCollection.dir = dir;
            VideosCollection.fetchPage();
        },


        editVideo: function (id) {
            console.log("Editing video " + id);

            if (!this.videoFormView) {
                this.videoFormView = new VideoFormView();
            }
            this.videoFormView.editForm = true;
            VideoModel.url = 'data-rest/video/' + id;
            VideoModel.clear().fetch();
        },

        addVideo: function () {
            console.log("Adding video ");

            if (!this.videoFormView) {
                this.videoFormView = new VideoFormView();
            }

            this.videoFormView.editBtn = false;
            VideoModel.url = 'data-rest/video';
            VideoModel.id = undefined;
            VideoModel.clear().set(VideoModel.defaults);
        }



    });


    // Return the view as the Require module
    return Router;
});
