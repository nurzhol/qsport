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
        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(CategoryFormTemplate),

        events: {
            "click .form-actions .save"   : "saveItem",
            "click .form-actions .delete" : "deleteItem"
        },

        // View initialization with listening of the collection
        initialize: function () {
            console.log('CategoryView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("CategoryView.render", this.model);
            $(this.el).html(this.template({ category: this.model }));
        },

        saveItem: function () {
            console.log("CategoryView.save started", this.model);

            this.model.set({
                CategoryName:this.$("#CategoryName").val(),
                CategoryLabel:this.$("#CategoryLabel").val()
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

            this.undelegateEvents();
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
    return CategoryView;
});
