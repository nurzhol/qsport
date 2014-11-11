/**
 * Define Require module with dependencies
 */
define([
  'underscore',
  'backbone',
  'collections/Hateoas'
], function (_, Backbone, Hateoas) {
  /**
   * UserModel Model
   */
  var UserModel = Hateoas.Model.extend({

      urlRoot: 'data-rest/user',

      defaults:{
          login:"",
          password:"",
          fullname:""
      }

  });

  // Return the view as the Require module
  return new UserModel();
});