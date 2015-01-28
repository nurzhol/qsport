/**
 * This file is the application bootstrap. It contains RequireJS configuration and Backbone bootstrap.
 */
require.config({
    /**
     * Require 2.0 introduced shim config which allows to configure dependencies for
     * scripts that do not call define() to register a module
     */
    shim: {
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: [
                "underscore",
                "jquery"
            ],
            exports: "Backbone"
        },
        "bootstrap": {
            deps: [
                "jquery"
            ],
            exports: "jQuery"
        },
        "ckeditor": {
            exports: "ckeditor"
        },
        "blockUI": {
            exports: "blockUI"
        },
        "momentLocal": {
            exports: "momentLocal"
        },
        "moment": {
            deps: [
                "momentLocal"
            ],
            exports: "moment"
        },
        "jqueryUI": {
            deps: [
                "jquery"
            ],
            exports: "jqueryUI"
        },
        "jqueryYOUTUBE": {
            deps: [
                "jquery",
                "jqueryUI"
            ],
            exports: "jqueryYOUTUBE"
        },
        "timepicker": {
            deps: [
                "jquery"
            ],
            exports: "timepicker"
        }
    },
    /**
     * Shortcut configuration for libs
     */
    paths: {
        jquery: "../libs/jquery-1.8.0/jquery.min",
        momentLocal: "../libs/jquery-1.8.0/moment-with-locales",
        moment: "../libs/jquery-1.8.0/moment",
        blockUI: "../libs/jquery-1.8.0/jquery.blockUI",
        bootstrap: "../libs/bootstrap-2.1.0/js/bootstrap.min",
        underscore: "../libs/underscore-1.3.3/underscore",
        backbone: "../libs/backbone-0.9.2/backbone",
        text: "../libs/require-2.0.6/text",
        i18n: "../libs/require-2.0.6/i18n",
        ckeditor: "../libs/ckeditor/ckeditor",
        jqueryUI: "../libs/jquery-ui/jquery-ui",
        jqueryYOUTUBE: "../libs/jquery-ui/jquery.youtubepopup",
        timepicker: "../libs/jquery-1.8.0/jquery.timepicker"
    }
});

require([
    'views/login',
    'routers/router'
], function (LoginView, Router) {
    // Initialize routing and start Backbone.history()
    route = new Router();

    $("#commentBtn").click(function(){
        route.commentsList();
    });

    // Initialize the application view
    new LoginView(function () {
        console.log("login callback");
        Backbone.history.start();
    });
});

