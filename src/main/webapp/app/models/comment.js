/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone',
  'collections/Hateoas'
], function (_, Backbone, Hateoas) {
  /**
   * CommentModel Model
   */
  var CommentModel = Hateoas.Model.extend({

      urlRoot: 'data-rest/comment'


  });

  // Return the view as the Require module
  return new CommentModel();
});