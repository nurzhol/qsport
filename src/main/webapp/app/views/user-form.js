/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/user',
    'text!templates/user-form.html',
    'collections/users'
], function ($, _, Backbone, UserModel, UserFormTemplate, UsersCollection) {
    /**
     * User view which represents the user data grid
     */
    var UsersOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.content',
        // Binding the users collection
        model: UserModel,

        categories: UsersCollection,

        editForm: false,

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(UserFormTemplate),

        events: {
            "click .form-actions-user .save": "saveItem",
            "click .form-actions-user .delete": "deleteItem"
        },


        // View initialization with listening of the collection
        initialize: function () {
            console.log('UserOneView.initialize');
            //this.model.on('reset', this.render, this);

            this.$el.html('Күтіңіз...');

            this.model.on('change', this.render, this);
        },

        render: function(){
            console.log("UserOneView.render", this.model);
            $(this.el).html(this.template({ model: this.model, editBtn: this.editForm }));
            this.delegateEvents;
        },

        saveItem: function () {
            console.log("UserOneView.save started", this.model);

            console.log("The saved file is" + this.model.id);

            this.model.set({
                login: this.$("#login").val(),
                password: this.$("#password").val(),
                fullname:  this.$("#fullname").val()
            });

            this.model.save(null, {
                success: function (model) {
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    route.navigate('users', {trigger: true});

                },
                error: function () {
                    alert('Error', 'An error occurred while saving', 'alert-error');

                }
            });

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
    return UsersOneView;
});
