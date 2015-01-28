/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage23.html'
], function ($, _, Backbone, Hateoas, NewsTemplate) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '#cat23',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            var PdfCollection1 = Hateoas.PageableCollection.extend({
                url:''

            });

            var collection0 = new PdfCollection1;
            collection0.page = 1;
            collection0.sort = "id";
            collection0.dir = "desc";
            collection0.limit = 3;

            this.model = collection0;

            collection0.url = "data-rest/pdf/search/findByPdfByPage";

            this.model.on('reset', this.render, this);

            collection0.fetchPage();



        },

        render: function () {

            var translite =  window.localStorage.getItem('translite')||'cyrillic';

            $(this.el).html(this.template({translite: translite, collection:  this.model}));
            $("#cat23_1").html(this.template({translite: translite, collection:  this.model}));

        }

       });

    // Return the view as the Require module
    return NewsOneView;
});
