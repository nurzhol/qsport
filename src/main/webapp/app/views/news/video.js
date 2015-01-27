/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/videoList.html'
], function ($, _, Backbone, Hateoas, VideoTemplate) {
    /**
     * User view which represents the user data grid
     */

    var VideoOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',
        el: '#youtubeVideoList',
        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(VideoTemplate),
        // No events
        events: {
        },
        // View initialization with listening of the collection
        initialize: function () {
            console.log('VideoOneView.initialize');


            var VideoCollection = Hateoas.Collection.extend({
                url: ''

            });

            var collection0 = new VideoCollection();

            collection0.url = "data-rest/video";

            var self = this;
            collection0.fetch().done(function () {

                collection0.each(function (model) {
                    var d2 = self.toHHMMSS(model.get("startTime"));
                    model.set("startTime", d2);
                });
                console.log("VideoOneView.render", self.model);

                $(self.el).html(self.template({  collection: collection0
                }));
            });


        },

        toHHMMSS: function (sec) {
            var sec_num = parseInt(sec, 10); // don't forget the second param
            var hours = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);

            if (hours < 10) {
                hours = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            var time = hours + ':' + minutes + ':' + seconds;
            return time;
        }

    });

    // Return the view as the Require module
    return VideoOneView;
});
