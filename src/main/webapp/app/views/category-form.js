/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'models/category',
    'text!templates/category-form.html'
], function ($, _, Backbone, CategoryModel, CategoryFormTemplate) {
    /**
     * User view which represents the user data grid
     */
    var CategoryView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '.content',
        // Binding the users collection
        model: CategoryModel,

        editForm: false,

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(CategoryFormTemplate),

        events: {
            "click .form-actions-category .save": "saveItem",
            "click .form-actions-category .delete": "deleteItem",
            "click .form-actions-category .cancel": "cancel"
        },

        // View initialization with listening of the collection
        initialize: function () {
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log('CategoryView.initialize');
            //this.model.on('reset', this.render, this);
            console.log("CategoryView.render", this.model);
            this.model.on('change', this.render, this);
        },

        render: function () {
            console.log("CategoryView.render started", this.model);
            $(this.el).html(this.template({ category: this.model, editBtn: this.editForm }));
            this.delegateEvents;
            $.unblockUI();
        },

        cancel: function () {
            route.navigate('categories', {trigger: true});
        },

        saveItem: function () {
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log("CategoryView.save started", this.model);

            var categoryLabel = this.$("#categoryLabel").val();
            this.model.set({
                lang: this.$("#lang").val(),
                categoryName: this.$("#categoryName").val(),
                categoryLabel: categoryLabel,
                categoryLabelLt: this.transliterateLat(categoryLabel),
                categoryLabelAr: this.transliterateArab(categoryLabel)
            });

            this.model.save(null, {
                success: function (model) {
                    alert('Success!', 'Item saved successfully', 'alert-success');
                    $.unblockUI();
                    route.navigate('categories', {trigger: true});
                },
                error: function () {
                    $.unblockUI();
                    alert('Error', 'An error occurred while trying to delete this item', 'alert-error');
                }
            });

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
            //http://ru.wikipedia.org/wiki/Казахская_письменность
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
    return CategoryView;
});
