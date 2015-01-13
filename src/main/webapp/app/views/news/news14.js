/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage14.html'
], function ($, _, Backbone, Hateoas, NewsTemplate) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.cat14',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            var language =  window.localStorage.getItem('locale')||'kz';
            var translite =  window.localStorage.getItem('translite')||'cyrillic';

            var self =this;

            var NewsCollection1 = Hateoas.Collection.extend({
                url:''
            });
            var collection0 = new NewsCollection1;
            collection0.url = "data-rest/news/search/findByCategoryName?categoryName=cat14&lang="+language;

            collection0.fetch().done(function(){
                $(self.el).html(self.template({translite: translite, categoryName:"Ұлттық тағамдар" ,
                    collection: collection0}));
            });

        }

       });

    // Return the view as the Require module
    return NewsOneView;
});
