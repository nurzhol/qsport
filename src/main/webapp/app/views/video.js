/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/datagrid.html',
    'collections/videos'
], function ($, _, Backbone,  VideoTemplate, VideosCollection) {
    /**
     * User view which represents the user data grid
     */
    var VideoView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(VideoTemplate),
        // No events
        model: VideosCollection,
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            console.log('VideoView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {

            this.model.each(function(model) {
                var d =$.fn.toHHMMSS(model.get("duration"));
                model.set("duration", d);


                var d2 =$.fn.toHHMMSS(model.get("startTime"));
                model.set("startTime", d2);
            });
            console.log("VideoView.render", this.model);

            $('.content').html(this.template({
                link:'#video',
                linkEdit:'#video/edit/',
                columns:[
                    {
                        title:'videoLabel',
                        key:'videoLabel',
                        sort:true
                    },
                    {
                        title:'videoUrl',
                        key:'videoUrl',
                        sort:true
                    },
                    {
                        title:'duration',
                        key:'duration',
                        sort:true
                    },
                    {
                        title:'startTime',
                        key:'startTime',
                        sort:true
                    }

                ],
                collection:this.model
            }));

        }
    });

    // Return the view as the Require module
    return VideoView;
});
