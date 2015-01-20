/**
 * Define Require module with dependencies
 */
define([
    'underscore',
    'backbone',
    'collections/Hateoas'
], function (_, Backbone, Hateoas) {
    /**
     * Skills Collection which only extends Hateoas generic collection with the url binding
     */
    var MusicCollection = Hateoas.PageableCollection.extend({
        url: 'data-rest/music'
    });

    // Return the view as the Require module
    return new MusicCollection();
});
