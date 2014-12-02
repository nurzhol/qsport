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
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log('CategoriesView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {
            this.model.each(function(model) {
                if(model.get("lang")=="kz"){
                    model.set("lang", "Қазақша");
                }else{
                    model.set("lang", "Орысша");
                }
            });

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
                    },
                    {
                        title:'Тілі',
                        key:'lang',
                        sort:true
                    }
                ],
                collection:this.model
            }));

            $.unblockUI();
        }
    });

    // Return the view as the Require module
    return CategoriesView;
});
