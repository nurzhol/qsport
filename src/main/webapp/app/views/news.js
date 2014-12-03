/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/news',
    'text!templates/datagrid.html',
    'moment'
], function ($, _, Backbone,  NewsCollection, NewsTemplate, moment) {
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
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log('NewsView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {
            moment.locale("ru");
            moment().zone(6);
            this.model.each(function(model) {
                //var d = new Date(model.get("createDate"));
                var d = moment(model.get("createDate")).format('MMMM Do YYYY, hh:mm:ss');
                model.set("createDate", d);

                var d2 = moment(model.get("editedDate")).format('D MMMM  YYYY, hh:mm:ss');
                model.set("editedDate", d2);
            });

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
                        title:'editedDate',
                        key:'editedDate',
                        sort:true
                    }
                ],
                collection:this.model
            }));

            $.unblockUI();
        }
    });

    // Return the view as the Require module
    return NewsView;
});
