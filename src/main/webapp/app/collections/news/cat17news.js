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
  var Cat17NewsCollection = Hateoas.PageableCollection.extend({
      cat17: 'cat17_1',
      url:'data-rest/news/search/findByCategoryNameByPage?categoryName='+this.cat17+'&lang=kz'
  });

  // Return the view as the Require module
  return new Cat17NewsCollection();
});
