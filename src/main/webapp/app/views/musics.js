/**
 * Define Require module with dependencies
 */
define([
    'bootstrap',
    'underscore',
    'backbone',
    'collections/music',
    'text!templates/musicgrid.html'
], function ($, _, Backbone,  MusicCollection, MusicTemplate) {
    /**
     * User view which represents the user data grid
     */
    var MusicView = Backbone.View.extend({
        // The view generate a div tag
        tagName:'div',
        // Binding the users collection
        model:MusicCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        template:_.template(MusicTemplate),
        // No events
        events:{
        },
        // View initialization with listening of the collection
        initialize:function () {
            $.blockUI({ message: '<h1><img src="icons/loading.gif" /> Күте тұрыңыз...</h1>' });
            console.log('MusicView.initialize');
            this.model.on('reset', this.render, this);
        },
        // View rendering handler
        render:function () {

            console.log("MusicView.render", this.model);
            $('.content').html(this.template({
                link:'#music',
                linkReject:'#music/reject/',
                columns:[
                    {
                        title:'musicLabel',
                        key:'musicLabel',
                        sort:true
                    },
                    {
                        title:'musicUrl',
                        key:'musicUrl',
                        sort:true
                    }
                ],
                collection:this.model
            }));

            $.unblockUI();
        }
    });

    // Return the view as the Require module
    return MusicView;
});
