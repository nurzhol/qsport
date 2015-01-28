/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/categorynews.html'
], function ($, _, Backbone, Hateoas, NewsTemplate) {
    /**
     * User view which represents the user data grid
     */
    var CategoryBatchNewsView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',


        el: '.newscontent',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            console.log("Category news rendered");
        },

        render: function(){

            var language =  window.localStorage.getItem('locale')||'kz';
            var translite =  window.localStorage.getItem('translite')||'cyrillic';

            var self =this;

            var NewsCollection1 = Hateoas.Collection.extend({
                url:''

            });
            var collection0 = new NewsCollection1;
            collection0.url = "data-rest/news/search/findByCategoryBatch?lang="+language;

            collection0.fetch().done(function(){


                $(self.el).html(self.template({translite: translite,
                    categoryLabel: "Жаңалықтар",
                    categoryLabelLt: "ZHanaliqtar",
                    categoryLabelAr: "ZHanaliqtar", collection: collection0}));

                $(".maincontent").hide();
                $(".newscontent").show();
                $('html,body').scrollTop(0);
            });
        }

       });

    // Return the view as the Require module
    return CategoryBatchNewsView;
});
