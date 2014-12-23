/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'text!templates/news/one.html',
    'collections/Hateoas',
    'models/news',
    'models/comment',
    'moment',
    "recaptchaajax"
], function ($, _, Backbone, OneTemplate, Hateoas, OneModel, CommentModel, moment, recaptchaajax) {
    /**
     * User view which represents the user data grid
     */

    var OneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.newscontent',


        model: OneModel,

        text: '',

        commentModel: CommentModel,

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(OneTemplate),

        events: {
            "click .comment .addComment": "validate",
            "click .fullnews .addCommentForNews": "showComment",
            "click .fullnews .addCommentForNewsReply": "replyComment"
        },

        // View initialization with listening of the collection
        initialize: function () {
            console.log('OneView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("OneView.render", this.model);


            $(this.el).html('Күтіңіз...');

            this.model.on('change', this.render, this);

        },

        render: function () {
            var self = this;

            var language = window.localStorage.getItem('locale') || 'kz';
            var translite = window.localStorage.getItem('translite') || 'cyrillic';


            var CommentCollection1 = Hateoas.Collection.extend({
                url: ''
            });

            var comments = new CommentCollection1;

            var newsId = this.model.id;
            comments.url = "data-rest/comment/search/findByNews?news_id=" + newsId + "&parent_id=0";

            var newOrderedCollection = new CommentCollection1();

            comments.fetch().done(function () {
                comments.each(function (model) {
                    var d = moment(model.get("commentDate")).locale("ru").format('D MM YYYY, H:mm:ss');
                    model.set("commentDate", d);

                    newOrderedCollection

                });

                //func1(newOrderedCollectionArr, commentsArr, null, 0);




                $(self.el).html(self.template({translite: translite, news: self.model, comments: comments}));


                var promise = self.wait();
                promise.done(function () {
                    console.log("The start captcha add");
                    self.reloadRecaptcha();
                });


            });
        },



        wait: function () {
            var deferred = $.Deferred();

            setTimeout(function () {
                deferred.resolve();
            }, 2000);

            return deferred.promise();
        },


        addComment: function () {

            self = this;
            console.log("One.addComment started", this.model);

            var commentContent = this.text + this.$("#newCommentTextId").val();
            this.commentModel.set({
                AuthDetail: this.$("#newCommentAuthorId").val(),
                comment: commentContent,
                commentLt: this.transliterateLat(commentContent),
                active: 0,
                news: {
                    "rel": "comment.Comment.news",
                    "href": "http://" + window.location.host + "/data-rest/news/" + this.model.id
                }
            });

            this.commentModel.save(null, {
                success: function (model) {
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    self.render();//route.navigate('readnews/' + self.model.id, {trigger: true});
                },
                error: function () {
                    alert('Error', 'An error occurred while saving', 'alert-error');
                }
            });


            $("div.modal.comment").modal('hide');
        },

        replyComment: function(ev){
            this.text ='';
            var auth = $(ev.target).siblings('.author').html();
            var content = $(ev.target).siblings('.commentcontent').html();
            this.text = "<div><b>"+auth+",</b><div class='quote'>"+content+"</div></div>"
            $("div.modal.comment").modal('show');
        },

        showComment: function() {
            this.text = '';
            $("div.modal.comment").modal('show');
        },


        transliterateLat: function (word) {
            var translitLat = ""
                , a = {};

            a["Ё"] = "YO", a["Й"] = "I", a["Ц"] = "TS", a["У"] = "U", a["К"] = "K", a["Е"] = "E", a["Н"] = "N", a["Г"] = "G", a["Ш"] = "SH", a["Щ"] = "SCH", a["З"] = "Z", a["Х"] = "H", a["Ъ"] = "'";
            a["ё"] = "yo", a["й"] = "i", a["ц"] = "ts", a["у"] = "u", a["к"] = "k", a["е"] = "e", a["н"] = "n", a["г"] = "g", a["ш"] = "sh", a["щ"] = "sch", a["з"] = "z", a["х"] = "h", a["ъ"] = "'";
            a["Ф"] = "F", a["Ы"] = "I", a["В"] = "V", a["А"] = "a", a["П"] = "P", a["Р"] = "R", a["О"] = "O", a["Л"] = "L", a["Д"] = "D", a["Ж"] = "ZH", a["Э"] = "E";
            a["ф"] = "f", a["ы"] = "i", a["в"] = "v", a["а"] = "a", a["п"] = "p", a["р"] = "r", a["о"] = "o", a["л"] = "l", a["д"] = "d", a["ж"] = "zh", a["э"] = "e";
            a["Я"] = "Ya", a["Ч"] = "CH", a["С"] = "S", a["М"] = "M", a["И"] = "I", a["Т"] = "T", a["Ь"] = "'", a["Б"] = "B", a["Ю"] = "YU";
            a["я"] = "ya", a["ч"] = "ch", a["с"] = "s", a["м"] = "m", a["и"] = "i", a["т"] = "t", a["ь"] = "'", a["б"] = "b", a["ю"] = "yu";
            a["ә"] = "a", a["і"] = "i", a["ө"] = "o", a["ү"] = "u", a["ұ"] = "u", a["қ"] = "q", a["ң"] = "n", a["ғ"] = "g", a["һ"] = "";
            a["Ә"] = "A", a["І"] = "I", a["Ө"] = "O", a["Ү"] = "U", a["Ұ"] = "U", a["Қ"] = "Q", a["Ң"] = "N", a["Ғ"] = "G", a["Һ"] = "";

            for (i in word) {
                if (word.hasOwnProperty(i)) {
                    if (a[word[i]] === undefined) {
                        translitLat += word[i];
                    } else {
                        translitLat += a[word[i]];
                    }
                }
            }
            return translitLat;
        },

        reloadRecaptcha: function () {
            var publicKey = "6LcR7f4SAAAAAIXOQyqhNzrVJ9Ye-xX6ohoq69Xn";
            var div = "recaptchaDivId";
            Recaptcha.create(publicKey, div, {theme: "white"});
            return false;
        },

        validate: function () {
            self = this;
            var challenge = Recaptcha.get_challenge();
            var response = Recaptcha.get_response();
            $.ajax({
                type: "POST",
                url: "rest/recaptcha",
                async: false,
                data: {
                    challenge: challenge,
                    response: response
                },
                success: function (resp) {
                    if (resp) {
                        self.addComment();
                    } else {
                        $("#recaptchaDivMessage").html('<span style= "color: red">Қате енгізілген сурет</span>');
                        self.reloadRecaptcha();
                    }
                }
            });
            return false;
        }


    });

    // Return the view as the Require module
    return OneView;
});
