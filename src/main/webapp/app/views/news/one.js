/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/news/one.html',
    'collections/Hateoas',
    'models/news'
], function ($, _, Backbone, OneTemplate, Hateoas, OneModel) {
    /**
     * User view which represents the user data grid
     */
    var OneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.newscontent',


        model: OneModel,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(OneTemplate),



        // View initialization with listening of the collection
        initialize: function () {
            console.log('OneView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("OneView.render", this.model);

            this.$el.html('Күтіңіз...');


            this.model.on('change', this.render, this);

        },

        render: function () {
            $('.newscontent').html(this.template({ news: this.model}));
        }
    });

    // Return the view as the Require module
    return OneView;
});
