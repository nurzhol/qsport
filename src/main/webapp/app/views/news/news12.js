/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage12.html',
    'collections/news/aihoinews'
], function ($, _, Backbone, Hateoas, AiHoiNewsTemplate,  AiHoiNewsCollection) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        model: AiHoiNewsCollection,

        el: '#cat12',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(AiHoiNewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {


            console.log('NewsOneView cat12.initialize');
            this.model.on('reset', this.render, this);

        },

        // View rendering handler
        render: function () {

            var model = Hateoas.Model.extend();
            var CategotyCollection1 = Hateoas.Collection.extend({
                url: ''
            });
            var category1 = new CategotyCollection1;
            category1.url = "data-rest/category/search/findOneWithCatName?categoryName=cat12";

            category1.fetch({async: false}).done(function () {
                category1.each(function (model0) {
                    model = model0;
                })

            });

            var translite = window.localStorage.getItem('translite') || 'cyrillic';
            console.log("NewsOneView cat12.render", this.model);

            $(this.el).html(this.template({translite: translite,
                link: '#aihoinews',
                collection: this.model,
                categoryLabel: model.get("categoryLabel"),
                categoryLabelLt: model.get("categoryLabelLt"),
                categoryLabelAr: model.get("categoryLabelAr")}));
        }


    });

    // Return the view as the Require module
    return NewsOneView;
});
