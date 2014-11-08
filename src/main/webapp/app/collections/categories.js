/**
 * Define Require module with dependencies
 */
define([
    'underscore',
    'backbone',
    'collections/Hateoas',
    'models/category'
], function (_, Backbone, Hateoas, CollectionModel) {
    /**
     * Skills Collection which only extends Hateoas generic collection with the url binding
     */
    var CategoriesCollection = Hateoas.PageableCollection.extend({
        url: 'data-rest/category'
    });

    // Return the view as the Require module
    return new CategoriesCollection();
});
