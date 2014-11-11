/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/users',
    'text!templates/datagrid.html'
], function ($, _, Backbone,  UserCollection, UsersTemplate) {
    /**
     * User view which represents the user data grid
     */
    var UsersView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the users collection
        model:UserCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(UsersTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            console.log('UsersView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {
            console.log("UsersView.render", this.model);
            $('.content').html(this.template({
                link:'#users',
                linkEdit:'#users/edit/',
                columns:[
                    {
                        title:'login',
                        key:'login',
                        sort:true
                    },
                    {
                        title:'password',
                        key:'password',
                        sort:true
                    },
                    {
                        title:'fullname',
                        key:'fullname',
                        sort:true
                    }

                ],
                collection:this.model
            }));
        }
    });

    // Return the view as the Require module
    return UsersView;
});
