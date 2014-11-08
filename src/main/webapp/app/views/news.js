/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/news',
    'text!templates/datagrid.html'
], function ($, _, Backbone,  NewsCollection, NewsTemplate) {
    /**
     * User view which represents the user data grid
     */
    var NewsView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the users collection
        model:NewsCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(NewsTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            console.log('NewsView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {
            console.log("NewsView.render", this.model);
            $('.content').html(this.template({
                link:'#news',
                columns:[
                    {
                        title:'CategoryName',
                        key:'CategoryName',
                        sort:true
                    },
                    {
                        title:'NewsTitle',
                        key:'NewsTitle',
                        sort:true
                    },
                    {
                        title:'NewsDetail',
                        key:'NewsDetail',
                        sort:true
                    },
                    {
                        title:'imgUrl',
                        key:'imgUrl',
                        sort:true
                    }
                ],
                collection:this.model
            }));
        }
    });

    // Return the view as the Require module
    return NewsView;
});
