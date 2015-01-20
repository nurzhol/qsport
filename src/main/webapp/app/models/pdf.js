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
  var PdfModel = Hateoas.Model.extend({

      urlRoot: 'data-rest/pdf',
      defaults:{
          pdfLabel:"",
          pdfImageUrl:"",
          pdfUrl:""
      }


  });

  // Return the view as the Require module
  return new PdfModel();
});