/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/categoryruennews.html',
    'collections/news/ruennews'
], function ($, _, Backbone, Hateoas, NewsTemplate, RuEnNewsCollection) {
    /**
     * User view which represents the user data grid
     */
    var CategoryRuNewsView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        model: RuEnNewsCollection,

        el: '.newscontent',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            console.log("Category ru-en news init");
        },

        render: function(){
            console.log("Category ru-en news rendered");
            $(".maincontent").hide();
            $(".newscontent").show();
            $('html,body').scrollTop(0);

            var translite = window.localStorage.getItem('translite') || 'cyrillic';
            $(this.el).html(this.template({translite: translite, collection: this.model}));
        }

       });

    // Return the view as the Require module
    return CategoryRuNewsView;
});
