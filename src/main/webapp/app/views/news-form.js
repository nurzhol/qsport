/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/news',
    'text!templates/news-form.html',
    'collections/categories'
], function ($, _, Backbone, NewsModel, NewsFormTemplate, CollectionCategories) {
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
            "click .form-actions .save": "saveItem",
            "click .form-actions .delete": "deleteItem"
        },


        // View initialization with listening of the collection
        initialize: function () {
            console.log('NewsOneView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("NewsOneView.render", this.model);

            this.$el.html('Күтіңіз...');
            var self = this;
            this.categories.fetch().done(function () {
                $(self.el).html(self.template({ model: self.model, categories: self.categories, editBtn: self.editForm}))
            });
        },

        saveItem: function () {
            console.log("NewsOneView.save started", this.model);

            console.log("The saved file is" + $("#NewsCategoryId").val());

            var imageName = this.saveFile();

            this.model.set({
                NewsTitle: this.$("#NewsTitle").val(),
                NewsDetail: this.$("#NewsDetail").val(),
                imgUrl: imageName,
                category: {
                    "rel": "news.News.category",
                    "href": $("#NewsCategoryId").val() //"http://"+ window.location.host + "/data-rest/category/3"
                }
            });

            this.model.save(null, {
                success: function (model) {
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    route.navigate('news', {trigger: true});

                },
                error: function () {
                    alert('Error', 'An error occurred while saving', 'alert-error');

                }
            });

            this.undelegateEvents();


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
