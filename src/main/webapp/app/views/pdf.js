/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/pdf'
], function ($, _, Backbone, PdfModel) {
    /**
     * Login view which represents the login popup
     */
    var PdfView = Backbone.View.extend({
        // Wired on the login modal
        el: 'div.modal.pdf',

        model: PdfModel,

        // Listen view events on modal buttons
        events: {
            'click .modal-footer .btn:not(.btn-primary) ': 'cancel',
            'click .modal-footer .btn.btn-primary ': 'saveFile'
        },

        initialize: function () {

            this.$("#filePdfImageInput").val(null);
            this.$("#filePdfInput").val(null);
            this.$("#pdfLabel").val("");
            $("#upload-pdf-image-info").html("");
            $("#upload-pdf-info").html("");
            this.$el.modal('show');
        },

        // Cancel button handler
        cancel: function () {
            this.$el.modal('hide');
        },

        saveFile: function () {
            var picture = this.$('input[id="filePdfImageInput"]')[0].files[0];
            var pictureId = 'pdfpicture' + $.now() + '.' + this.getImageFileExt();
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


            var pdf = this.$('input[id="filePdfInput"]')[0].files[0];
            var pdfId = 'pdf' + $.now() + '.' + this.getFileExt();

            var pdfdata = new FormData();
            pdfdata.append('pdf', pdf);
            pdfdata.append('pdfId', pdfId);


            $.ajax({
                url: '/rest/pdf',
                data: pdfdata,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (data) {
                    console.log('Success!', 'Pdf saved successfully', 'alert-success');
                },
                error: function (data) {
                    console.log('Error', 'An error occurred while uploading pdf', 'alert-error');
                }
            });


            this.$el.modal('hide');

            this.model.set({
                pdfLabel: this.$('input[id="pdfLabel"]').val(),
                pdfImageUrl: pictureId,
                pdfUrl: pdfId
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
            var files = this.$('input[id="filePdfInput"]')[0].files;
            var ext = null;
            if (files[0] != null) {
                var filename = files[0].name.replace(/\\/g, '/').replace(/.*\//, '');
                ext = filename.replace(/^.*\./, '').toLowerCase();
            }
            return ext;
        },


        getImageFileExt: function () {
            var files = this.$('input[id="filePdfImageInput"]')[0].files;
            var ext = null;
            if (files[0] != null) {
                var filename = files[0].name.replace(/\\/g, '/').replace(/.*\//, '');
                ext = filename.replace(/^.*\./, '').toLowerCase();
            }
            return ext;
        }
    });

    // Return the view as the Require module
    return PdfView;

});
