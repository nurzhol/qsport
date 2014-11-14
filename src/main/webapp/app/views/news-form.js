/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/news',
    'text!templates/news-form.html',
    'collections/categories',
    'jtinymce'
], function ($, _, Backbone, NewsModel, NewsFormTemplate, CollectionCategories, jtinymce) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.content',
        // Binding the users collection
        model: NewsModel,

        categories: CollectionCategories,

        editForm: false,

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsFormTemplate),

        events: {
            "click .form-actions-news .save": "saveItem",
            "click .form-actions-news .delete": "deleteItem"
        },


        // View initialization with listening of the collection
        initialize: function () {
            console.log('NewsOneView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("NewsOneView.render", this.model);

            this.$el.html('Күтіңіз...');
            this.model.on('change', this.render, this);
        },

        render : function(){
            var self = this;
            this.categories.fetch().done(function () {
                $(self.el).html(self.template({ model: self.model, categories: self.categories, editBtn: self.editForm}));
                /*$('#newsDetail').tinymce({
                    script_url : '../../libs/tinymce/tinymce.min.js'
                });*/
            });
            this.delegateEvents;

        },

        saveItem: function () {
            console.log("NewsOneView.save started", this.model);

            console.log("The saved file is" + this.model.id);

            var imageName = this.saveFile();

            this.model.set({
                newsTitle: this.$("#newsTitle").val(),
                newsDetail: this.$("#newsDetail").val(),//tinymce.get('newsDetail').getContent(),
                imgUrl: imageName,
                category: {
                    "rel": "news.News.category",
                    "href": $("#NewsCategoryId").val() //"http://"+ window.location.host + "/data-rest/category/3"
                }
            });


            if(this.model.id)
                this.changeCategory("/data-rest/news/"+this.model.id+"/category", $("#NewsCategoryId").val());

            this.model.save(null, {
                success: function (model) {
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    route.navigate('news', {trigger: true});

                },
                error: function () {
                    alert('Error', 'An error occurred while saving', 'alert-error');

                }
            });

        },

        changeCategory: function (RelEntity, Entity){
            $.ajax({
                url: RelEntity,
                data: Entity,
                cache: false,
                contentType: "text/uri-list",
                type: 'PUT',
                success: function (data) {
                    console.log('Success!', 'The Entity changed', 'alert-success');
                },
                error: function (data) {
                    console.log('Error', 'An error', 'alert-error');
                }
            });
        },

        saveFile: function () {
            var picture = $('input[id="fileInput"]')[0].files[0];
            var pictureId = 'picture' + $.now() + '.' + this.getFileExt();
            var data = new FormData();
            data.append('picture', picture);
            data.append('pictureId', pictureId);

            $.ajax({
                url: '/rest/picture',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (data) {
                    console.log('Success!', 'Image saved successfully', 'alert-success');
                },
                error: function (data) {
                    console.log('Error', 'An error occurred while uploading image', 'alert-error');
                }
            });

            return pictureId;
        },
        getFileExt: function () {
            var files = $('input[id="fileInput"]')[0].files;
            var ext = null;
            if (files[0] != null) {
                var filename = files[0].name.replace(/\\/g, '/').replace(/.*\//, '');
                ext = filename.replace(/^.*\./, '').toLowerCase();
            }
            return ext;
        },
        deleteItem: function () {
            this.model.destroy({
                success: function () {
                    alert('Item deleted successfully');
                    window.history.back();
                }
            });
            return false;
        }

    });

    // Return the view as the Require module
    return NewsOneView;
});
