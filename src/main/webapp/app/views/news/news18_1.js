/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage18_1.html',
    'collections/news/blognews'
], function ($, _, Backbone, Hateoas, NewsTemplate, BlogNewsCollection) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        model: BlogNewsCollection,

        el: '#cat18_1',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            console.log('NewsOneView cat17.initialize');
            this.model.on('reset', this.render, this);
        },

        // View rendering handler
        render: function () {
            var translite = window.localStorage.getItem('translite') || 'cyrillic';
            console.log("NewsOneView cat18.render", this.model);

            $(this.el).html(this.template({translite:translite,
                link: "#!blognews" ,
                collection: this.model}));
        }


    });

    // Return the view as the Require module
    return NewsOneView;
});
