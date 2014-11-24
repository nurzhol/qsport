/**
 * Define Require module with dependencies
 */
define([
    'jquery',
    'backbone',
    'views/news/one',
    "models/news"
], function ($, Backbone, OneView, NewsModel) {
    /**
     * Url router for the applications. Defines routes with url and handlers
     */
    var RouterA = Backbone.Router.extend({
        // List all the routes possibles and bind them to a handler
        routes: {
            'readnews/:id': 'showNews'

        },
        // Constructor
        initialize: function () {
            this.oneView = null;
        },


        showNews: function(id) {
            console.log("Show news " +id);
            if (!this.oneView) {
                this.oneView = new OneView();
            }

            NewsModel.url = 'data-rest/news/'+id;
            NewsModel.fetch();
        }

    });


    // Return the view as the Require module
    return RouterA;
});
