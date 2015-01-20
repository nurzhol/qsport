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
  var MusicModel = Hateoas.Model.extend({

      urlRoot: 'data-rest/music',
      defaults:{
          musicLabel:"",
          musicUrl:""
      }


  });

  // Return the view as the Require module
  return new MusicModel();
});