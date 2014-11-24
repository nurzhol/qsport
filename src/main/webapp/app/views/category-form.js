/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/category',
    'text!templates/category-form.html'
], function ($, _, Backbone, CategoryModel, CategoryFormTemplate) {
    /**
     * User view which represents the user data grid
     */
    var CategoryView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.content',
        // Binding the users collection
        model: CategoryModel,

        editForm: false,

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(CategoryFormTemplate),

        events: {
            "click .form-actions-category .save": "saveItem",
            "click .form-actions-category .delete": "deleteItem",
            "click .form-actions-category .cancel": "cancel"
        },

        // View initialization with listening of the collection
        initialize: function () {
            console.log('CategoryView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("CategoryView.render", this.model);
            this.model.on('change', this.render, this);
        },

        render: function () {
            $(this.el).html(this.template({ category: this.model, editBtn: this.editForm }));
            this.delegateEvents;
        },

        cancel: function () {
            route.navigate('categories', {trigger: true});
        },

        saveItem: function () {
            console.log("CategoryView.save started", this.model);

            this.model.set({
                categoryName: this.$("#categoryName").val(),
                categoryLabel: this.$("#categoryLabel").val()
            });

            this.model.save(null, {
                success: function (model) {
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    route.navigate('categories', {trigger: true});
                },
                error: function () {
                    alert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });

        },

        deleteItem: function () {
            if (!confirm("Өшіргіңіз келе ма?")) {
                return;
            }

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
    return CategoryView;
});
