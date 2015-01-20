/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage12.html'
], function ($, _, Backbone, Hateoas, NewsTemplate) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.cat12',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            var language =  window.localStorage.getItem('locale')||'kz';
            var translite =  window.localStorage.getItem('translite')||'cyrillic';

            var self =this;

            var model = Hateoas.Model.extend();
            var CategotyCollection1 = Hateoas.Collection.extend({
                url:''
            });
            var category1 = new CategotyCollection1;
            category1.url = "data-rest/category/search/findOneWithCatName?categoryName=cat12";

            category1.fetch({async: false}).done(function(){
                category1.each(function(model0){
                    model = model0;
                })

            });

            var NewsCollection1 = Hateoas.Collection.extend({
                url:''
            });
            var collection0 = new NewsCollection1;
            collection0.url = "data-rest/news/search/findByCategoryName?categoryName=cat12&lang="+language;

            collection0.fetch().done(function(){
                $(self.el).html(self.template({translite: translite,
                    categoryLabel: model.get("categoryLabel"),
                    categoryLabelLt: model.get("categoryLabelLt"),
                    categoryLabelAr: model.get("categoryLabelAr"), collection: collection0}));
            });

        }

       });

    // Return the view as the Require module
    return NewsOneView;
});
