/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/newspage',
    'text!templates/newspage.html',
    'collections/Hateoas',
    'jqueryYOUTUBE',
    'i18n!nls/translit'
], function ($, _, Backbone,  NewsPageCollection, NewsPageTemplate, Hateoas, jqueryYOUTUBE, translit) {


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
            console.log("NewsPageView translit red", translit.red);
            var language =  window.localStorage.getItem('locale')||'kz';
            var translite =  window.localStorage.getItem('translite')||'cyrillic';

            console.log("NewsPageView default language is", language);

            var youTubeId = 'Nd6C-3Zd0AE';
            $("#youtubeLink").YouTubePopup({  autoplay: 1 , youtubeId: youTubeId, title: 'Ұлытау ұлттық тарихымыздың көне сыры',draggable: false,  modal: true, controls: 0, start:100});
            //var timeInSeconds = $.fn.getYouTubeVideoDuration(youTubeId);
            //$("#youtubeTime").html($.fn.toHHMMSS(timeInSeconds));

            $("#feedBackBtn").click(function(event) {
                $( "#dialog-form" ).dialog();
            });


            var self =this;

            var NewsCollection1 = Hateoas.Collection.extend({
                url:''
            });
            var collection0 = new NewsCollection1;
            collection0.url = "data-rest/news/search/findByCategoryName?id=0&lang="+language;

            collection0.fetch().done(function(){
                $('.cat0').html(self.template({translite: translite, categoryName:"cat0" ,
                collection: collection0}));
            });


            var collection1 = new NewsCollection1;
            collection1.url = "data-rest/news/search/findByCategoryName?id=1&lang="+language;

            collection1.fetch().done(function(){
                $('.cat1').html(self.template({translite: translite, categoryName:"cat1" ,
                    collection: collection1}));
            });


            var collection2 = new NewsCollection1;
            collection2.url = "data-rest/news/search/findByCategoryName?id=2&lang="+language;

            collection2.fetch().done(function(){
                $('.cat2').html(self.template({translite: translite, categoryName:"cat2" ,
                    collection: collection2}));
            });


            var collection3 = new NewsCollection1;
            collection3.url = "data-rest/news/search/findByCategoryName?id=3&lang="+language;

            collection3.fetch().done(function(){
                $('.cat3').html(self.template({translite: translite, categoryName:"cat3" ,
                    collection: collection3}));
            });


            var collection4 = new NewsCollection1;
            collection1.url = "data-rest/news/search/findByCategoryName?id=4&lang="+language;

            collection4.fetch().done(function(){
                $('.cat4').html(self.template({translite: translite, categoryName:"cat4" ,
                    collection: collection4}));
            });


        }
    });

    // Return the view as the Require module
    return NewsPageView;
});
