/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/videoList.html'
], function ($, _, Backbone, Hateoas,  VideoTemplate) {
    /**
     * User view which represents the user data grid
     */

    var VideoOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        el: '.youtubeVideoList',
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(VideoTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            console.log('VideoOneView.initialize');



            var VideoCollection = Hateoas.Collection.extend({
                url:''

            });

            var collection0 =new VideoCollection();

            collection0.url = "data-rest/video";

            var self = this;
            collection0.fetch().done(function(){

                collection0.each(function(model) {
                    var d2 =$.fn.toHHMMSS(model.get("startTime"));
                    model.set("startTime", d2);
                });
                console.log("VideoOneView.render", self.model);

                $(self.el).html(self.template({
                    columns:[
                        {
                            title:'startTime',
                            key:'startTime',
                            sort:true
                        },
                        {
                            title:'videoLabel',
                            key:'videoLabel',
                            sort:true
                        }

                    ],
                    collection:collection0
                }));
            });

        }

    });

    // Return the view as the Require module
    return VideoOneView;
});
