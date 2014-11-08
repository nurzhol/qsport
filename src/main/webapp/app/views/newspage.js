/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/newspage',
    'text!templates/newspage.html',
    'collections/Hateoas'
], function ($, _, Backbone,  NewsPageCollection, NewsPageTemplate, Hateoas) {
    /**
     * User view which represents the user data grid
     */
    var NewsPageView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the users collection
        model: NewsPageCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(NewsPageTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            console.log('NewsPageView.initialize');
            this.render();
        },
        // View rendering handler
        render:function () {
            console.log("NewsPageView.render", this.model);

            var self =this;

            var NewsCollection1 = Hateoas.Collection.extend({
                url:''
            });
            var collection0 = new NewsCollection1;
            collection0.url = "data-rest/news/search/findByCategoryName?CategoryName=cat0";

            collection0.fetch().done(function(){
                $('.cat0').html(self.template({CategoryName:"cat0" ,
                collection: collection0}));
            });


            var collection1 = new NewsCollection1;
            collection1.url = "data-rest/news/search/findByCategoryName?CategoryName=cat1";

            collection1.fetch().done(function(){
                $('.cat1').html(self.template({CategoryName:"cat1" ,
                    collection: collection1}));
            });


            var collection2 = new NewsCollection1;
            collection2.url = "data-rest/news/search/findByCategoryName?CategoryName=cat2";

            collection2.fetch().done(function(){
                $('.cat2').html(self.template({CategoryName:"cat2" ,
                    collection: collection2}));
            });


            var collection3 = new NewsCollection1;
            collection3.url = "data-rest/news/search/findByCategoryName?CategoryName=cat3";

            collection3.fetch().done(function(){
                $('.cat3').html(self.template({CategoryName:"cat3" ,
                    collection: collection3}));
            });


            var collection4 = new NewsCollection1;
            collection1.url = "data-rest/news/search/findByCategoryName?CategoryName=cat4";

            collection4.fetch().done(function(){
                $('.cat4').html(self.template({CategoryName:"cat4" ,
                    collection: collection4}));
            });


        }
    });

    // Return the view as the Require module
    return NewsPageView;
});
