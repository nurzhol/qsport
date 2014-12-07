/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/comments',
    'text!templates/commentgrid.html'
], function ($, _, Backbone,  CommentsCollection, CommentsTemplate) {
    /**
     * User view which represents the user data grid
     */
    var CommentsView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the users collection
        model:CommentsCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(CommentsTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log('CommentsView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {

            this.model.each(function(model) {
                var d = moment(model.get("commentDate")).locale("ru").format('D MMMM  YYYY, H:mm:ss');
                model.set("commentDate", d);
            });

            console.log("CommentsView.render", this.model);
            $('.content').html(this.template({
                link:'#comments',
                linkApply:'#comments/apply/',
                linkReject:'#comments/reject/',
                columns:[
                    {
                        title:'AuthDetail',
                        key:'AuthDetail',
                        sort:true
                    },
                    {
                        title:'comment',
                        key:'comment',
                        sort:true
                    },
                    {
                        title:'commentDate',
                        key:'commentDate',
                        sort:true
                    }
                ],
                collection:this.model
            }));

            $.unblockUI();
        }
    });

    // Return the view as the Require module
    return CommentsView;
});
