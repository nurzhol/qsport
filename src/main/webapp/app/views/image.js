/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone'
], function ($, _, Backbone) {
    /**
     * Login view which represents the login popup
     */
    var ImageView = Backbone.View.extend({
        // Wired on the login modal
        el: 'div.modal.image',

        // Listen view events on modal buttons
        events: {
            'click .modal-footer .btn:not(.btn-primary) ': 'cancel',
            'click .modal-footer .btn.btn-primary ': 'saveFile'
        },

        initialize: function () {

            this.$("form input .image").val(null);
            $("#upload-file-info").html("");
            this.$el.modal('show');
        },

        // Cancel button handler
        cancel: function () {
            this.$el.modal('hide');
        },

        saveFile: function () {
            var picture = this.$('input[id="fileImageInput"]')[0].files[0];
            var pictureId = 'picture' + $.now() + '.' + this.getFileExt();
            var data = new FormData();
            data.append('picture', picture);
            data.append('pictureId', pictureId);

            $.ajax({
                url: '/rest/picture',
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

            this.$el.modal('hide');
        },

        getFileExt: function () {
            var files = this.$('input[id="fileImageInput"]')[0].files;
            var ext = null;
            if (files[0] != null) {
                var filename = files[0].name.replace(/\\/g, '/').replace(/.*\//, '');
                ext = filename.replace(/^.*\./, '').toLowerCase();
            }
            return ext;
        }
    });

    // Return the view as the Require module
    return ImageView;

});
