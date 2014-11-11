/**
 * This file is the application bootstrap. It contains RequireJS configuration and Backbone bootstrap.
 */
require.config({
  /**
   * Require 2.0 introduced shim config which allows to configure dependencies for
   * scripts that do not call define() to register a module
   */
  shim:{
    "underscore":{
      exports:"_"
    },
    "backbone":{
      deps:[
        "underscore",
        "jquery"
      ],
      exports:"Backbone"
    },
    "bootstrap":{
      deps:[
        "jquery"
      ],
      exports:"jQuery"
    },
    "jqueryUI":{
      deps:[
         "jquery"
      ],
       exports:"jqueryUI"
    },
    "jqueryYOUTUBE":{
        deps:[
            "jquery",
            "jqueryUI"
        ],
        exports:"jqueryYOUTUBE"
    }
  },
  /**
   * Shortcut configuration for libs
   */
  paths:{
    jquery:"../libs/jquery-1.8.0/jquery.min",
    bootstrap:"../libs/bootstrap-2.1.0/js/bootstrap.min",
    underscore:"../libs/underscore-1.3.3/underscore",
    backbone:"../libs/backbone-0.9.2/backbone",
    text:"../libs/require-2.0.6/text",
    jqueryUI:"../libs/jquery-ui/jquery-ui",
    jqueryYOUTUBE:"../libs/jquery-ui/jquery.youtubepopup"
  }
});

require([
  'views/newspage'
], function (NewsPageView) {

  // Initialize the application view
  new NewsPageView(function () {
    console.log("NewsPageView callback");
  });
});

