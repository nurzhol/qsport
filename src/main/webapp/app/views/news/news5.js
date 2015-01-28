/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/Hateoas',
    'text!templates/news/newspage5.html'
], function ($, _, Backbone, Hateoas, NewsTemplate) {
    /**
     * User view which represents the user data grid
     */
    var NewsOneView = Backbone.View.extend({
        // The view generate a div tag
        tagName: 'div',

        el: '#cat5',
        // Binding the users collection

        // Binding the DataGridTemplate loaded by text plugin of Require
        template: _.template(NewsTemplate),


        // View initialization with listening of the collection
        initialize: function () {

            var language =  window.localStorage.getItem('locale')||'kz';

            var NewsCollection1 = Hateoas.PageableCollection.extend({
                url:''

            });

            var collection0 = new NewsCollection1;
            collection0.page = 1;
            collection0.sort = "createDate";
            collection0.dir = "desc";
            collection0.limit = 6;
            this.model = collection0;

            collection0.url = "data-rest/news/search/findByCategoryNameByPage?categoryName=cat5&lang="+language;

            this.model.on('reset', this.render, this);

            collection0.fetchPage();

        },

        render: function () {

            var translite =  window.localStorage.getItem('translite')||'cyrillic';

            var model = Hateoas.Model.extend();
            var CategotyCollection1 = Hateoas.Collection.extend({
                url:''
            });
            var category1 = new CategotyCollection1;
            category1.url = "data-rest/category/search/findOneWithCatName?categoryName=cat5";

            category1.fetch({async: false}).done(function(){
                category1.each(function(model0){
                    model = model0;
                })

            });

            $(this.el).html(this.template({translite: translite,
                categoryLabel: model.get("categoryLabel"),
                categoryLabelLt: model.get("categoryLabelLt"),
                categoryLabelAr: model.get("categoryLabelAr"), collection: this.model}));
        }

       });

    // Return the view as the Require module
    return NewsOneView;
});
