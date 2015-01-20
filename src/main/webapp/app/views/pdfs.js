/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/pdf',
    'text!templates/musicgrid.html'
], function ($, _, Backbone,  PdfCollection, MusicTemplate) {
    /**
     * User view which represents the user data grid
     */
    var PdfsView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the users collection
        model:PdfCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(MusicTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log('PdfView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {

            console.log("PdfView.render", this.model);
            $('.content').html(this.template({
                link:'#pdf',
                linkReject:'#pdf/reject/',
                columns:[
                    {
                        title:'pdfLabel',
                        key:'pdfLabel',
                        sort:true
                    },
                    {
                        title:'pdfImageUrl',
                        key:'pdfImageUrl',
                        sort:true
                    },
                    {
                        title:'pdfUrl',
                        key:'pdfUrl',
                        sort:true
                    }
                ],
                collection:this.model
            }));

            $.unblockUI();
        }
    });

    // Return the view as the Require module
    return PdfsView;
});
