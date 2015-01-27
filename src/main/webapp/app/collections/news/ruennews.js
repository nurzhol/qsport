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
  var RuEnNewsCollection = Hateoas.Collection.extend({
      url:'data-rest/news/search/findByLang?lang="ru,en"'
  });

  // Return the view as the Require module
  return new RuEnNewsCollection();
});
