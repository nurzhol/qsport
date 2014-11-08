/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  /**
   * NewsModel Model
   */
  var NewsModel = Backbone.Model.extend({

      urlRoot: 'data-rest/news',

      defaults:{
          NewsTitle:"",
          NewsDetail:"толтырыңыз"
      }

  });

  // Return the view as the Require module
  return new NewsModel();
});