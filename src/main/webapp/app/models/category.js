/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  /**
   * CategoryModel Model
   */
  var CategoryModel = Backbone.Model.extend({

      urlRoot: 'data-rest/category',

      defaults:{
          CategoryName:"111",
          CategoryLabel:"Label111"
      }

  });

  // Return the view as the Require module
  return new CategoryModel();
});