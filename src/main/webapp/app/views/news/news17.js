/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage17.html',
    'collections/news/cat17news'
], function ($, _, Backbone, Hateoas, NewsTemplate, Cat17NewsCollection) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        model: Cat17NewsCollection,

        el: '#cat17',
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
            console.log("NewsOneView cat17.render", this.model);

            $(this.el).html(this.template({translite:translite,
                link: "#!changecat17/" + this.model.cat17,
                collection: this.model}));
        }


    });

    // Return the view as the Require module
    return NewsOneView;
});
