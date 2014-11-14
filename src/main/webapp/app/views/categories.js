/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/categories',
    'text!templates/datagrid.html'
], function ($, _, Backbone,  CategoriesCollection, CategoriesTemplate) {
    /**
     * User view which represents the user data grid
     */
    var CategoriesView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the users collection
        model:CategoriesCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(CategoriesTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            console.log('CategoriesView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {
            console.log("CategoriesView.render", this.model);
            $('.content').html(this.template({
                link:'#categories',
                linkEdit:'#categories/edit/',
                columns:[
                    {
                        title:'categoryName',
                        key:'categoryName',
                        sort:true
                    },
                    {
                        title:'categoryLabel',
                        key:'categoryLabel',
                        sort:true
                    }
                ],
                collection:this.model
            }));
        }
    });

    // Return the view as the Require module
    return CategoriesView;
});
