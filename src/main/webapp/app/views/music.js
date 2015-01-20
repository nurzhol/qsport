/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/music'
], function ($, _, Backbone, MusicModel) {
    /**
     * Login view which represents the login popup
     */
    var MusicView = Backbone.View.extend({
        // Wired on the login modal
        el: 'div.modal.music',

        model:MusicModel,

        // Listen view events on modal buttons
        events: {
            'click .modal-footer .btn:not(.btn-primary) ': 'cancel',
            'click .modal-footer .btn.btn-primary ': 'saveFile'
        },

        initialize: function () {

            this.$("form input .music").val(null);
            this.$("#musicUrl").val("");
            this.$("#musicLabel").val("");
            $("#upload-file-info-music").html("");
            this.$el.modal('show');
        },

        // Cancel button handler
        cancel: function () {
            this.$el.modal('hide');
        },

        saveFile: function () {
            var music = this.$('input[id="fileMusicInput"]')[0].files[0];
            //var musicId = this.$('input[id="fileMusicInput"]').val();
            var musicId = 'music'+$.now() + '.' + this.getFileExt();;

            var musicLabel = this.$('input[id="musicLabel"]').val();
            var musicUrl = this.$('input[id="musicUrl"]').val();

            var data = new FormData();
            data.append('music', music);
            data.append('musicId', musicId);

            this.$el.modal('hide');

            if (music) {
                $.ajax({
                    url: '/rest/music',
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    type: 'POST',
                    success: function (data) {
                        console.log('Success!', 'Image saved successfully', 'alert-success');
                    },
                    error: function (data) {
                        console.log('Error', 'An error occurred while uploading image', 'alert-error');
                    }
                });

            }


            var musicName = "";
            if (musicUrl){
                musicName = musicUrl
            }else{
                musicName = "music/"+musicId
            }

            this.model.clear();
            this.model.set({
                musicLabel: musicLabel,
                musicUrl: musicName
            });

            this.model.save(null, {
                success: function (model) {
                    console.log('Success!', 'Music saved successfully', 'alert-success');
                },
                error: function () {
                    console.log('Error', 'An error occurred while trying to save Music', 'alert-error');
                }
            });

        },

        getFileExt: function () {
            var files = this.$('input[id="fileMusicInput"]')[0].files;
            var ext = null;
            if (files[0] != null) {
                var filename = files[0].name.replace(/\\/g, '/').replace(/.*\//, '');
                ext = filename.replace(/^.*\./, '').toLowerCase();
            }
            return ext;
        }
    });

    // Return the view as the Require module
    return MusicView;

});
