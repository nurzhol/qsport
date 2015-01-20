/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone',
  'collections/Hateoas'
], function (_, Backbone, Hateoas) {
  /**
   * CategoryModel Model
   */
  var CategoryModel = Hateoas.Model.extend({

      urlRoot: 'data-rest/category',
      defaults:{
          categoryName:"",
          categoryLabel:"",
          categoryLabelLt:"",
          categoryLabelAr:"",
          lang:"kz"
      }


  });

  // Return the view as the Require module
  return new CategoryModel();
});