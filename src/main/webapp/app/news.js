/**
 * This file is the application bootstrap. It contains RequireJS configuration and Backbone bootstrap.
 */

var locale = window.localStorage.getItem("locale") || "kz";
console.log("The setted i18n value is " + locale);
require.config({

    locale: locale,
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
        "audioplayer": {
            exports: "audioplayer"
        }
    },


    /**
     * Shortcut configuration for libs
     */
    paths: {
        jquery: "../libs/jquery-1.8.0/jquery.min",
        bootstrap: "../libs/bootstrap-2.1.0/js/bootstrap.min",
        underscore: "../libs/underscore-1.3.3/underscore",
        backbone: "../libs/backbone-0.9.2/backbone",
        text: "../libs/require-2.0.6/text",
        i18n: "../libs/require-2.0.6/i18n",
        jqueryUI: "../libs/jquery-ui/jquery-ui",
        jqueryYOUTUBE: "../libs/jquery-ui/jquery.youtubepopup",
        audioplayer: "../audio_player_files/flashdetect"


    }
})
;

require([
    'views/newspage',
    'routers/news/router',
    'audioplayer'
], function (NewsPageView, RouterA, audioplayer) {
    router = new RouterA();

    console.log('router is' + router)

    // Initialize the application view
    new NewsPageView(function () {
        console.log("NewsPageView callback");
        Backbone.history.start();
    });
});

