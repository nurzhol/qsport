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
  var VideoModel = Hateoas.Model.extend({

      urlRoot: 'data-rest/video',
      defaults:{
          videoLabel:"",
          videoUrl:"",
          youtubeVideoId: "",
          duration: 0,
          startTime: 0
      }


  });

  // Return the view as the Require module
  return new VideoModel();
});