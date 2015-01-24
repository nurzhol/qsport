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
        "wimpy": {
            exports: "wimpy"
        },
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
        "youtube": {
            deps: [
                "jquery"
            ],
            exports: "youtube"
        },
        "bootstrap": {
            deps: [
                "jquery"
            ],
            exports: "jQuery"
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
        audioplayer: "../audio_player_files/flashdetect",
        youtube: "../libs/youtube/bootstrap.youtubepopup",
        wimpy: "../libs/wimpy/wimpy"
    }
})
;

require([
    'bootstrap',
    'views/newspage',
    'routers/news/router',
    'audioplayer'
], function ($, NewsPageView, Router, audioplayer) {
    route = new Router();

    $("#headercat24").click(function(){
        $("#headercat24").addClass("section-menu-active");
        $("#headercat25").removeClass("section-menu-active");
        $("#headercat26").removeClass("section-menu-active");
        $("#headercat27").removeClass("section-menu-active");
    });
    $("#headercat25").click(function(){
        $("#headercat25").addClass("section-menu-active");
        $("#headercat24").removeClass("section-menu-active");
        $("#headercat26").removeClass("section-menu-active");
        $("#headercat27").removeClass("section-menu-active");
    });
    $("#headercat26").click(function(){
        $("#headercat26").addClass("section-menu-active");
        $("#headercat25").removeClass("section-menu-active");
        $("#headercat24").removeClass("section-menu-active");
        $("#headercat27").removeClass("section-menu-active");
    });
    $("#headercat27").click(function(){
        $("#headercat27").addClass("section-menu-active");
        $("#headercat25").removeClass("section-menu-active");
        $("#headercat26").removeClass("section-menu-active");
        $("#headercat24").removeClass("section-menu-active");
    });

    $("#emailSender").click(function(){
        $("div.modal.email").modal('hide');
        var data = new FormData();
        data.append('email', $("#email").val());
        data.append('emailBody', $("#emailBody").val());

        $.ajax({
            url: '/rest/email',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                console.log('Success!', 'Email is Sended', 'alert-success');
            },
            error: function (data) {
                console.log('Error', 'An error occurred while email send', 'alert-error');
            }
        });

        $("#email").val("");
        $("#emailBody").val("");


    });

    console.log('router is' + route)

    // Initialize the application view
    new NewsPageView(function () {
        console.log("NewsPageView callback");
        Backbone.history.start();
    });
});

