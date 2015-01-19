/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/news',
    'text!templates/news-form.html',
    'collections/categories',
    'ckeditor',
    'models/category',
    'blockUI'
], function ($, _, Backbone, NewsModel, NewsFormTemplate, CollectionCategories, ckeditor, CategoryModel, blockUI) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.content',
        // Binding the users collection
        model: NewsModel,

        categories: CollectionCategories,

        editForm: false,

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsFormTemplate),

        events: {
            "click .form-actions-news .save": "saveItem",
            "click .form-actions-news .delete": "deleteItem",
            "click .form-actions-news .cancel": "cancel",
            "change #lang": "reloadCategoryList"
        },


        removeEditor: function (id) {
            var o = CKEDITOR.instances[id];
            if (o)
                CKEDITOR.remove(o);
        },

        // View initialization with listening of the collection
        initialize: function () {

            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });


            console.log('NewsOneView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("NewsOneView.render", this.model);

            this.$el.html('Күтіңіз...');
            //this.model.on('change', this.render(""), this);

            this.removeEditor("newsDetail");
        },

        reloadCategoryList: function () {
            catLang = $("#lang").val();
            this.render(catLang);
        },

        wait: function () {
            var deferred = $.Deferred();

            setTimeout(function () {
                deferred.resolve();
            }, 2000);

            return deferred.promise();
        },


        loadEditor: function (id) {
            CKEDITOR.replace(id, {
                "extraPlugins": 'imagebrowser',
                "imageBrowser_listUrl": "/rest/ckeditorimage/"
            });
        },

        loadEditor2: function (id) {
            /*if(CKEDITOR.instances[id])
             delete CKEDITOR.instances[id];*/

            var o = CKEDITOR.instances[id];
            if (o) {
                o.destroy()
            } else {
                CKEDITOR.replace(id);
            }

        },

        render: function (catLang) {
            //$(".newsDetailTMCCLS").show();
            //$(".newsDetailTMC").css("display","block");
            //tinyMCE.execCommand('mceToggleEditor', false, 'newsDetailTMC');


            var self = this;
            this.categories.fetch().done(function () {
                var catIdStr = self.model.get('news.News.category');

                if (catIdStr == undefined) {
                    if (catLang == "")
                        catLang = "kz";

                    $(self.el).html(self.template({newslang: catLang, model: self.model, categories: self.getCurrentCatList(self.categories, catLang), editBtn: self.editForm, catUrl: ''}));

                    var promise = self.wait();
                    promise.done(function () {
                        console.log("The start add of ckeditor");
                        self.loadEditor('newsDetail');

                        $.unblockUI();
                    });

                    //tinyMCE.activeEditor.setContent('');
                } else {
                    CategoryModel.url = catIdStr;
                    CategoryModel.fetch().done(function () {
                        console.log("Ok");
                        if (catLang == "")
                            catLang = CategoryModel.get("lang");
                        var catUrl = "http://" + window.location.host + "/data-rest/category/" + CategoryModel.id;
                        $(self.el).html(self.template({newslang: catLang , model: self.model, categories: self.getCurrentCatList(self.categories, catLang), editBtn: self.editForm, catUrl: catUrl}));

                        var promise = self.wait();
                        promise.done(function () {
                            console.log("The start edit of ckeditor");
                            self.loadEditor('newsDetail');
                            $.unblockUI();
                        });


                        //tinyMCE.activeEditor.setContent(self.model.get('newsDetail'));
                        //$('#newsDetailTMC').html();

                        /*$('#newsDetail').tinymce({
                         script_url : '../../libs/tinymce/tinymce.min.js'
                         });*/

                    });
                }
            });

            this.delegateEvents;

        },

        getCurrentCatList : function(categories, catLang ){
            var arrayElems = [];
            categories.each(function (model) {
                if (catLang == model.get("lang"))
                    arrayElems.push(model);
            });

            var OwnCategoryes = Backbone.Collection.extend({

            });

            return new OwnCategoryes(arrayElems);
        },


        saveItem: function () {
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log("NewsOneView.save started", this.model);

            console.log("The saved file is" + this.model.id);

            var imageName = "";

            var picture = $('input[id="fileInput"]')[0].files[0];

            if(picture){
                imageName = this.saveFile();
            }else{
                imageName = this.model.imgUrl;
            }

            //var textContent = tinyMCE.get('newsDetailTMC').getContent();
            var textContent = CKEDITOR.instances.newsDetail.getData();
            this.model.set({
                newsTitle: this.$("#newsTitle").val(),
                newsTitleLt: this.transliterateLat(this.$("#newsTitle").val()),
                newsTitleAr: this.transliterateArab(this.$("#newsTitle").val()),
                newsFeature: this.$("#newsFeature").val(),
                newsFeatureLt: this.transliterateLat(this.$("#newsFeature").val()),
                newsFeatureAr: this.transliterateArab(this.$("#newsFeature").val()),
                newsDetail: textContent, //this.$("#newsDetail").val(),
                newsDetailLt: this.transliterateLat(this.$("#newsDetail").val()),//tinymce.get('newsDetail').getContent(),
                newsDetailAr: this.transliterateArab(this.$("#newsDetail").val()),//tinymce.get('newsDetail').getContent(),
                imgUrl: imageName,
                category: {
                    "rel": "news.News.category",
                    "href": $("#NewsCategoryId").val() //"http://"+ window.location.host + "/data-rest/category/3"
                }
            });


            if (this.model.id)
                this.changeCategory("/data-rest/news/" + this.model.id + "/category", $("#NewsCategoryId").val());


            //$(".newsDetailTMC").css("display","none");


            this.model.save(null, {
                success: function (model) {
                    //$(".newsDetailTMCCLS").hide();
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    $.unblockUI();
                    route.navigate('news', {trigger: true});

                },
                error: function () {
                    alert('Error', 'An error occurred while saving', 'alert-error');
                    $.unblockUI();

                }
            });


        },

        cancel: function () {
            //$(".newsDetailTMCCLS").hide();
            route.navigate('news', {trigger: true});
        },

        changeCategory: function (RelEntity, Entity) {
            $.ajax({
                url: RelEntity,
                data: Entity,
                cache: false,
                contentType: "text/uri-list",
                type: 'PUT',
                success: function (data) {
                    console.log('Success!', 'The Entity changed', 'alert-success');
                },
                error: function (data) {
                    console.log('Error', 'An error', 'alert-error');
                }
            });
        },

        saveFile: function () {
            var picture = $('input[id="fileInput"]')[0].files[0];
            var pictureId = 'picture' + $.now() + '.' + this.getFileExt();
            var data = new FormData();
            data.append('picture', picture);
            data.append('pictureId', pictureId);

            $.ajax({
                url: '/rest/picture',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: 'POST',
                success: function (data) {
                    console.log('Success!', 'Image saved successfully', 'alert-success');
                },
                error: function (data) {
                    console.log('Error', 'An error occurred while uploading image', 'alert-error');
                }
            });

            return pictureId;
        },
        getFileExt: function () {
            var files = $('input[id="fileInput"]')[0].files;
            var ext = null;
            if (files[0] != null) {
                var filename = files[0].name.replace(/\\/g, '/').replace(/.*\//, '');
                ext = filename.replace(/^.*\./, '').toLowerCase();
            }
            return ext;
        },
        deleteItem: function () {
            if (!confirm("Өшіргіңіз келе ма?")) {
                return;
            }

            this.model.destroy({
                success: function () {
                    alert('Item deleted successfully');
                    window.history.back();
                }
            });
            return false;
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


        transliterateArab: function (word) {
            var translitLat = ""
                , a = {};

            a["Ё"] = "ە", a["Й"] = "ي", a["Ц"] = "س", a["У"] = "ۋ", a["К"] = "ك", a["Е"] = "ە", a["Н"] = "ن", a["Г"] = "گ", a["Ш"] = "ش", a["Щ"] = "ش", a["З"] = "ز", a["Х"] = "ح", a["Ъ"] = "";
            a["ё"] = "ە", a["й"] = "ي", a["ц"] = "س", a["у"] = "ۋ", a["к"] = "ك", a["е"] = "ە", a["н"] = "ن", a["г"] = "گ", a["ш"] = "ش", a["щ"] = "ش", a["з"] = "ز", a["х"] = "ح", a["ъ"] = "";
            a["Ф"] = "ف", a["Ы"] = "ﯼ", a["В"] = "ۆ", a["А"] = "ا", a["П"] = "پ", a["Р"] = "ر", a["О"] = "و", a["Л"] = "ل", a["Д"] = "د", a["Ж"] = "ج", a["Э"] = "ە";
            a["ф"] = "ف", a["ы"] = "ﯼ", a["в"] = "ۆ", a["а"] = "ا", a["п"] = "پ", a["р"] = "ر", a["о"] = "و", a["л"] = "ل", a["д"] = "د", a["ж"] = "ج", a["э"] = "ە";
            a["Я"] = "اي", a["Ч"] = "چ", a["С"] = "س", a["М"] = "م", a["И"] = "ي", a["Т"] = "ت", a["Ь"] = "", a["Б"] = "ب", a["Ю"] = "ۉ";
            a["я"] = "اي", a["ч"] = "چ", a["с"] = "س", a["м"] = "م", a["и"] = "ي", a["т"] = "ت", a["ь"] = "", a["б"] = "ب", a["ю"] = "ۉ";
            a["ә"] = "ٵ", a["і"] = "ٸ", a["ө"] = "ٶ", a["ү"] = "ٷ", a["ұ"] = "ۇ", a["қ"] = "ق", a["ң"] = "ڭ", a["ғ"] = "ع", a["һ"] = "ھ";
            a["Ә"] = "ٵ", a["І"] = "ٸ", a["Ө"] = "ٶ", a["Ү"] = "ٷ", a["Ұ"] = "ۇ", a["Қ"] = "ق", a["Ң"] = "ڭ", a["Ғ"] = "ع", a["Һ"] = "ھ";

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
        }

    });

    // Return the view as the Require module
    return NewsOneView;
});
