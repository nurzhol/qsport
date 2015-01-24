/**
 * Define Require module with dependencies
 */
define([
    'wimpy',
    'bootstrap',
    'underscore',
    'backbone',
    'collections/newspage',
    'collections/Hateoas',
    //'jqueryYOUTUBE',
    'i18n!nls/translit',
    'views/news/news1',
    'views/news/news2',
    'views/news/news3',
    'views/news/news4',
    'views/news/news5',
    'views/news/news6',
    'views/news/news7',
    'views/news/news8',
    'views/news/news10',
    'views/news/news11',
    'views/news/news12',
    'views/news/news13',
    'views/news/news14',
    'views/news/news15',
    'views/news/news16',
    'views/news/news17',
    'views/news/news18',
    'views/news/video',
    'views/news/news19',
    'views/news/news24_27',
    'views/news/news00'
], function (wimpy, $, _, Backbone, NewsPageCollection, Hateoas, /*jqueryYOUTUBE,*/ translit, News1View, News2View, News3View, News4View, News5View, News6View, News7View, News8View, News9View, News10View, News11View, News12View, News13View, News14View, News15View, News16View, News17View, News18View, VideoView, News19View, News24_27View, News00View) {


    /**
     * User view which represents the user data grid
     */
    var NewsPageView = Backbone.View.extend({
        // The view generate a div tag
        //tagName:'div',
        // Binding the users collection
        //model: NewsPageCollection,
        // Binding the DataGridTemplate loaded by text plugin of Require
        //template:_.template(NewsPageTemplate),
        // No events
        events: {
        },
        // View initialization with listening of the collection
        initialize: function (callback) {
            this.callback = callback;
            if (this.callback) {
                this.callback();
            }

            //this.insertAudioPlayer();
            this.insertWepPyAudioPlayer();
            //$(".youtubeClass").click(this.playVideo());
            console.log('NewsPageView.initialize');
            this.news1View = null;
            this.news2View = null;
            this.news3View = null;
            this.news4View = null;
            this.news5View = null;
            this.news6View = null;
            this.news7View = null;
            this.news8View = null;
            this.news9View = null;
            this.news10View = null;
            this.news11View = null;
            this.news12View = null;
            this.news13View = null;
            this.news14View = null;
            this.news15View = null;
            this.news16View = null;
            this.news17View = null;
            this.news18View = null;
            this.videoView = null;
            this.news19View = null;
            this.news24_27View = null;
            this.news00View = null;
            this.render();
        },
        // View rendering handler
        render: function () {
            console.log("NewsPageView.render", this.model);
            console.log("NewsPageView translit red", translit.red);
            var language = window.localStorage.getItem('locale') || 'kz';
            var translite = window.localStorage.getItem('translite') || 'cyrillic';

            console.log("NewsPageView default language is", language);


            $("#feedBackBtn").click(function (event) {
                $("div.modal.email").modal('show');
            });

            if (!this.news1View) {
                this.news1View = new News1View();
            }

            if (!this.news2View) {
                this.news2View = new News2View();
            }

            if (!this.news3View) {
                this.news3View = new News3View();
            }

            if (!this.news4View) {
                this.news4View = new News4View();
            }

            if (!this.news5View) {
                this.news5View = new News5View();
            }

            if (!this.news6View) {
                this.news6View = new News6View();
            }

            if (!this.news7View) {
                this.news7View = new News7View();
            }

            if (!this.news8View) {
                this.news8View = new News8View();
            }

            if (!this.news9View) {
                this.news9View = new News9View();
            }

            if (!this.news10View) {
                this.news10View = new News10View();
            }

            if (!this.news11View) {
                this.news11View = new News11View();
            }

            if (!this.news12View) {
                this.news12View = new News12View();
            }

            if (!this.news13View) {
                this.news13View = new News13View();
            }

            if (!this.news14View) {
                this.news14View = new News14View();
            }

            if (!this.news14View) {
                this.news14View = new News14View();
            }

            if (!this.news15View) {
                this.news15View = new News15View();
            }

            if (!this.news16View) {
                this.news16View = new News16View();
            }

            if (!this.news17View) {
                this.news17View = new News17View();
            }

            if (!this.news18View) {
                this.news18View = new News18View();
            }

            if (!this.videoView) {
                this.videoView = new VideoView();
            }

            if (!this.news19View) {
                this.news19View = new News19View();
            }
            if (!this.news24_27View) {
                this.news24_27View = new News24_27View();
            }

            if (!this.news00View) {
                this.news00View = new News00View();
            }

        },

        playVideo: function () {
            $(".youtubeClass").empty();
            $(".youtubeClass").html('    <img class="youtube" id="youtubeLink" style="cursor: pointer;" width="250" height="250"      src="http://img.youtube.com/vi/Nd6C-3Zd0AE/0.jpg" title="Ұлытау"/>');
            var elem = this.videoToPlay();
            var youTubeId = '-------';
            var youTubeTitle = 'ОНЛАЙН ВИДЕО';
            var seek = 0;
            if (elem.length != 0) {
                var elems = elem.split(';');
                youTubeId = elems[0];
                seek = elems[1];
            }
            $("#youtubeLink").YouTubePopup({  autoplay: 1, youtubeId: youTubeId, title: youTubeTitle, draggable: false, modal: true, controls: 0, start: seek});
        },

        videoToPlay: function () {
            var start = 0;
            $.ajax({
                type: "POST",
                url: "rest/video/elem",
                async: false,
                success: function (resp) {

                    start = resp;
                }
            });
            return start;
        },


        insertAudioPlayer: function () {
            var so = new SWFObject("audio_player_files/audioPlayer.swf", "player", "225", "110", "6", "#666666");
            so.addVariable("xmlPath", "audio_player_files/data.xml");
            so.write("audioplayer");
        },


        insertWepPyAudioPlayer: function () {
            var NewsCollection1 = Hateoas.Collection.extend({
                url: ''

            });
            var collection0 = new NewsCollection1;
            collection0.url = "data-rest/music/search/findAllWithoutPagination";
            //var playList = "";
            var playList = [];

            collection0.fetch().done(function () {
                collection0.each(function(model){
                    console.log(model);
                    playList.push({
                        "title" : model.get('musicLabel'),
                        "file"  : model.get('musicUrl')
                    });
                    //playList += '{ title:"'+model.get('musicLabel')+'", file:"'+model.get('musicUrl')+'" },';
                });
                //var elem = '<div class="wimpyAudioPlayer" data-wimpyplayer data-skin="libs/wimpy/301.tsv" data-width=150 data-height=50 data-autoAdvance=0 data-infoScroll=0 data-media="' +playList+ '"></div>';
                //$('.audioClass').html(elem);

                var myPlayer = new wimpyPlayer({
                    target : "wimpyAudioPlayer",
                    skin : "libs/wimpy/301.tsv",
                    width : 150,
                    height : 50,
                    autoAdvance : 0,
                    infoScroll : 0,
                    media : playList
                    });


            });



        }
    });

    // Return the view as the Require module
    return NewsPageView;
});
