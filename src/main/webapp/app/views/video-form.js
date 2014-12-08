/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/video',
    'text!templates/video-form.html',
    'jqueryYOUTUBE',
    'timepicker'
], function ($, _, Backbone, VideoModel, VideoFormTemplate, jqueryYOUTUBE, timepicker) {
    /**
     * User view which represents the user data grid
     */
    var VideoFormView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.content',
        // Binding the users collection
        model: VideoModel,

        editForm: false,

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(VideoFormTemplate),

        events: {
            "click .form-actions-video .save": "saveItem",
            "click .form-actions-video .delete": "deleteItem",
            "click .form-actions-video .cancel": "cancel"
        },

        // View initialization with listening of the collection
        initialize: function () {
            console.log('VideoFormView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("VideoFormView.render", this.model);
            this.model.on('change', this.render, this);
        },

        render: function () {
            console.log("VideoFormView.render started", this.model);
            $(this.el).html(this.template({ video: this.model, editBtn: this.editForm }));

            var promise = this.wait();
            promise.done(function () {
                $('#timePiker').timepicker({ 'timeFormat': 'H:i:s' });
            });

            this.delegateEvents;
        },

        lastStartTimeInSec: function () {
            var start = 0;
            $.ajax({
                type: "POST",
                url: "rest/video/start",
                async: false,
                success: function (resp) {

                    start = resp;
                }
            });
            return start;
        },

        wait: function () {
            var deferred = $.Deferred();

            setTimeout(function () {
                deferred.resolve();
            }, 2000);

            return deferred.promise();
        },

        cancel: function () {
            route.navigate('video', {trigger: true});
        },

        saveItem: function () {
            console.log("VideoFormView.save started", this.model);


            var urlInput = this.$("#videoUrl").val();
            var youTubeId = this.getYouTubeIdFromUrl(urlInput);

            if (!youTubeId) {
                alert("The video url is incorrect");
                return;
            }

            var durationInSeconds = $.fn.getYouTubeVideoDuration(youTubeId);

            var startTimeInHMS = this.$("#timePiker").val();
            var startTimeInSeconds = this.hmsToSecondsOnly(startTimeInHMS);
            var lastStartTime = this.lastStartTimeInSec();

            var startTime = 0;
            if (lastStartTime == 0)
                startTime = startTimeInSeconds;
            else
                startTime = lastStartTime;

            this.model.set({
                startTime: startTime,
                duration: durationInSeconds,
                videoUrl: urlInput,
                videoLabel: this.$("#videoLabel").val(),
                youtubeVideoId: youTubeId
            });

            this.model.save(null, {
                success: function (model) {
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    route.navigate('video', {trigger: true});
                },
                error: function () {
                    alert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });

        },

        //This function handels "HH:MM:SS" as well as "MM:SS" or "SS".
        hmsToSecondsOnly: function (str) {
            var p = str.split(':'),
                s = 0, m = 1;

            while (p.length > 0) {
                s += m * parseInt(p.pop(), 10);
                m *= 60;
            }

            return s;
        },

        getYouTubeIdFromUrl: function (youtubeUrl) {
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            var match = youtubeUrl.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            } else {
                return false;
            }
        },

        deleteItem: function () {
            if (!confirm("Өшіргіңіз келе ма?")) {
                return;
            }

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
    return VideoFormView;
});
