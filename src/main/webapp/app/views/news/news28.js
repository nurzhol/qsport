/**
 * Define Require module with dependencies
 *//**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage28.html',
    'collections/news/ruennewspage'
], function ($, _, Backbone, Hateoas, NewsTemplate, RuEnNewsCollectionPagable) {
    /**
     * User view which represents the user data grid
     */
    var CategoryRuNewsView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        model: RuEnNewsCollectionPagable,

        el: '#cat28',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {
            console.log("Category ru-en news init");
            this.model.on('reset', this.render, this);
        },

        render: function(){
            console.log("Category ru-en news rendered");
            var translite = window.localStorage.getItem('translite') || 'cyrillic';
            $(this.el).html(this.template({translite: translite, collection: this.model}));
        }

    });

    // Return the view as the Require module
    return CategoryRuNewsView;
});
