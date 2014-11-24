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
                linkEdit:'#news/edit/',
                columns:[
                    {
                        title:'newsFeature',
                        key:'newsFeature',
                        sort:true
                    },
                    {
                        title:'newsTitle',
                        key:'newsTitle',
                        sort:true
                    },
                    {
                        title:'newsDetail',
                        key:'newsDetail',
                        sort:true
                    },
                    {
                        title:'imgUrl',
                        key:'imgUrl',
                        sort:true
                    },
                    {
                        title:'createDate',
                        key:'createDate',
                        sort:true
                    },
                    {
                        title:'editedDate',
                        key:'editedDate',
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
