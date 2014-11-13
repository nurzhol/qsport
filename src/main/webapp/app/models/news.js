/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone',
  'collections/Hateoas'
], function (_, Backbone, Hateoas) {
  /**
   * NewsModel Model
   */
  var NewsModel = Hateoas.Model.extend({

      urlRoot: 'data-rest/news',

      defaults:{
          NewsTitle:"",
          NewsDetail:"",
          imgUrl:""
      }

  });

  // Return the view as the Require module
  return new NewsModel();
});