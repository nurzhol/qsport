/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/pdfnews.html',
    'models/pdf'
], function ($, _, Backbone, Hateoas, PdfTemplate, PdfModel) {
    /**
     * User view which represents the user data grid
     */
    var PdfNewsView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        model: PdfModel,

        el: '.newscontent',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(PdfTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            console.log("Pdf news rendered");
            this.model.on('change', this.render, this);
        },

        render: function(){

            var language =  window.localStorage.getItem('locale')||'kz';
            var translite =  window.localStorage.getItem('translite')||'cyrillic';

            var self =this;

            var NewsCollection1 = Hateoas.Collection.extend({
                url:''

            });
            var collection0 = new NewsCollection1;
            collection0.url = "data-rest/pdf";

            collection0.fetch().done(function(){


                $(self.el).html(self.template({translite: translite,
                    categoryLabel: self.model.get("categoryLabel"),
                    categoryLabelLt: self.model.get("categoryLabelLt"),
                    categoryLabelAr: self.model.get("categoryLabelAr"), collection: collection0}));

                $(".maincontent").hide();
                $(".newscontent").show();
                $('html,body').scrollTop(0);


            });
        }

       });

    // Return the view as the Require module
    return PdfNewsView;
});
