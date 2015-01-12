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
        "audioplayer": {
            exports: "audioplayer"
        }
        ,
        "momentLocal": {
            exports: "momentLocal"
        },
        "moment": {
            deps: [
                "momentLocal"
            ],
            exports: "moment"
        },
        "jqueryYOUTUBE": {
            deps: [
                "jquery",
                "jqueryUI"
            ],
            exports: "jqueryYOUTUBE"
        },
        "recaptchaajax" : {
            deps: [
                "jquery"
            ],

            exports: "recaptchaajax"
        }
    },


    /**
     * Shortcut configuration for libs
     */
    paths: {
        jquery: "../index/js/jquery-1.11.2.min",
        bootstrap: "../index/js/bootstrap.min",
        underscore: "../libs/underscore-1.3.3/underscore",
        backbone: "../libs/backbone-0.9.2/backbone",
        momentLocal: "../libs/jquery-1.8.0/moment-with-locales",
        moment: "../libs/jquery-1.8.0/moment",
        text: "../libs/require-2.0.6/text",
        i18n: "../libs/require-2.0.6/i18n",
        jqueryUI: "../libs/jquery-ui/jquery-ui",
        audioplayer: "../audio_player_files/flashdetect",
        jqueryYOUTUBE: "../libs/jquery-ui/jquery.youtubepopup",
        recaptchaajax: "http://www.google.com/recaptcha/api/js/recaptcha_ajax"
    }
})
;

require([
    'views/newspage',
    'routers/news/router',
    'audioplayer'
], function (NewsPageView, Router, audioplayer) {
    route = new Router();

    console.log('router is' + route)

    // Initialize the application view
    new NewsPageView(function () {
        console.log("NewsPageView callback");
        Backbone.history.start();
    });
});

