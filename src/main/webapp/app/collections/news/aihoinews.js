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
  var AiHoiNewsCollection = Hateoas.PageableCollection.extend({
      url:'data-rest/news/search/findByCategoryNameByPage?categoryName=cat12&lang=kz'
  });

  // Return the view as the Require module
  return new AiHoiNewsCollection();
});
