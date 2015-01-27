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
    'i18n!nls/translit',
    'views/news/news1',
    'views/news/news2',
    'views/news/news3',
    'views/news/news4',
    'views/news/news5',
    'views/news/news6',
    'views/news/news7',
    'views/news/news8',
    'views/news/news11',
    'views/news/news13',
    'views/news/news14',
    'views/news/news15',
    'views/news/news16',
    'views/news/news18',
    'views/news/video',
    'views/news/news19',
    'views/news/news22',
    'views/news/news23',
    'views/news/news24_27',
    'views/news/news28',
    'views/news/news00'
], function (wimpy, $, _, Backbone, NewsPageCollection, Hateoas,  translit, News1View, News2View, News3View,
             News4View, News5View, News6View, News7View, News8View, News11View, News13View, News14View, News15View, News16View, News18View, VideoView, News19View, News22View,  News23View, News24_27View,  News28View, News00View) {


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
            this.news11View = null;
            this.news13View = null;
            this.news14View = null;
            this.news15View = null;
            this.news16View = null;
            this.news18View = null;
            this.videoView = null;
            this.news19View = null;
            this.news22View = null;
            this.news23View = null;
            this.news24_27View = null;
            this.news28View = null;
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


            translite=== 'cyrillic' ? $("#title1").html("БАСЫ") : (translite=== 'latin' ?  $("#title1").html(this.transliterateLat("БАСЫ")):  (translite=== 'arab' ? $("#title1").html(this.transliterateArab("БАСЫ")): '' ) );
            translite=== 'cyrillic' ? $("#title2").html("ҚАУЫМДАСТЫҚ") : (translite=== 'latin' ?  $("#title2").html(this.transliterateLat("ҚАУЫМДАСТЫҚ")):  (translite=== 'arab' ? $("#title2").html(this.transliterateArab("ҚАУЫМДАСТЫҚ")): '' ) );
            translite=== 'cyrillic' ? $("#title3").html("ҰЛТТЫҚ СПОРТ ТҮРЛЕРІ") : (translite=== 'latin' ?  $("#title3").html(this.transliterateLat("ҰЛТТЫҚ СПОРТ ТҮРЛЕРІ")):  (translite=== 'arab' ? $("#title3").html(this.transliterateArab("ҰЛТТЫҚ СПОРТ ТҮРЛЕРІ")): '' ) );
            translite=== 'cyrillic' ? $("#title4").html("БАҺАДҮР") : (translite=== 'latin' ?  $("#title4").html(this.transliterateLat("БАҺАДҮР")):  (translite=== 'arab' ? $("#title4").html(this.transliterateArab("БАҺАДҮР")): '' ) );
            translite=== 'cyrillic' ? $("#title5").html("БАСҚА ЖАҢАЛЫҚТАР") : (translite=== 'latin' ?  $("#title5").html(this.transliterateLat("БАСҚА ЖАҢАЛЫҚТАР")):  (translite=== 'arab' ? $("#title5").html(this.transliterateArab("БАСҚА ЖАҢАЛЫҚТАР")): '' ) );


            translite=== 'cyrillic' ? $("#feedBackBtn").html("КЕРІ БАЙЛАНЫС") : (translite=== 'latin' ?  $("#feedBackBtn").html(this.transliterateLat("КЕРІ БАЙЛАНЫС")):  (translite=== 'arab' ? $("#feedBackBtn").html(this.transliterateArab("КЕРІ БАЙЛАНЫС")): '' ) );
            translite=== 'cyrillic' ? $("#pressBtn").html("БАСПАСӨЗ ҚЫЗМЕТІ") : (translite=== 'latin' ?  $("#pressBtn").html(this.transliterateLat("БАСПАСӨЗ ҚЫЗМЕТІ")):  (translite=== 'arab' ? $("#pressBtn").html(this.transliterateArab("БАСПАСӨЗ ҚЫЗМЕТІ")): '' ) );
            translite=== 'cyrillic' ? $("#tvprogrammBtn").html("Қазір эфирде:") : (translite=== 'latin' ?  $("#tvprogrammBtn").html(this.transliterateLat("Қазір эфирде:")):  (translite=== 'arab' ? $("#tvprogrammBtn").html(this.transliterateArab("Қазір эфирде:")): '' ) );
            translite=== 'cyrillic' ? $("#bookmarkme").html("Таңдаулыға қосу") : (translite=== 'latin' ?  $("#bookmarkme").html(this.transliterateLat("Таңдаулыға қосу")):  (translite=== 'arab' ? $("#bookmarkme").html(this.transliterateArab("Таңдаулыға қосу")): '' ) );
            translite=== 'cyrillic' ? $("#songBtn").html("ӘН - КӨҢІЛДІҢ АЖАРЫ") : (translite=== 'latin' ?  $("#songBtn").html(this.transliterateLat("ӘН - КӨҢІЛДІҢ АЖАРЫ")):  (translite=== 'arab' ? $("#songBtn").html(this.transliterateArab("ӘН - КӨҢІЛДІҢ АЖАРЫ")): '' ) );
            translite=== 'cyrillic' ? $("#addFirstBtn").html("ӘЛЕУМЕТТІК ЖОБА") : (translite=== 'latin' ?  $("#addFirstBtn").html(this.transliterateLat("ӘЛЕУМЕТТІК ЖОБА")):  (translite=== 'arab' ? $("#addFirstBtn").html(this.transliterateArab("ӘЛЕУМЕТТІК ЖОБА")): '' ) );
            translite=== 'cyrillic' ? $("#addSecondBtn").html("ТЕГІН ХАБАРЛАНДЫРУ") : (translite=== 'latin' ?  $("#addSecondBtn").html(this.transliterateLat("ТЕГІН ХАБАРЛАНДЫРУ")):  (translite=== 'arab' ? $("#addSecondBtn").html(this.transliterateArab("ТЕГІН ХАБАРЛАНДЫРУ")): '' ) );
            translite=== 'cyrillic' ? $("#sportText1").html("СПОРТ СЕНІҢ НАЗАРЫҢДА ") : (translite=== 'latin' ?  $("#sportText1").html(this.transliterateLat("СПОРТ СЕНІҢ НАЗАРЫҢДА ")):  (translite=== 'arab' ? $("#sportText1").html(this.transliterateArab("СПОРТ СЕНІҢ НАЗАРЫҢДА ")): '' ) );
            translite=== 'cyrillic' ? $("#sportText2").html("Оқиға ортасында жүрсең") : (translite=== 'latin' ?  $("#sportText2").html(this.transliterateLat("Оқиға ортасында жүрсең")):  (translite=== 'arab' ? $("#sportText2").html(this.transliterateArab("Оқиға ортасында жүрсең")): '' ) );
            translite=== 'cyrillic' ? $("#sportText3").html("суретке түсір бейнежазба жаса немесе мақала жазып бізге жолда") : (translite=== 'latin' ?  $("#sportText3").html(this.transliterateLat("суретке түсір бейнежазба жаса немесе мақала жазып бізге жолда")):  (translite=== 'arab' ? $("#sportText3").html(this.transliterateArab("суретке түсір бейнежазба жаса немесе мақала жазып бізге жолда")): '' ) );
            translite=== 'cyrillic' ? $("#cat14lable").html("ҰЛТТЫҚ ТАҒАМДАР ") : (translite=== 'latin' ?  $("#cat14lable").html(this.transliterateLat("ҰЛТТЫҚ ТАҒАМДАР ")):  (translite=== 'arab' ? $("#cat14lable").html(this.transliterateArab("ҰЛТТЫҚ ТАҒАМДАР ")): '' ) );
            translite=== 'cyrillic' ? $("#cat19lable").html("БӘСІРЕ ") : (translite=== 'latin' ?  $("#cat19lable").html(this.transliterateLat("БӘСІРЕ ")):  (translite=== 'arab' ? $("#cat19lable").html(this.transliterateArab("БӘСІРЕ ")): '' ) );
            translite=== 'cyrillic' ? $("#cat23lable").html("КІТАП СӨРЕСІ") : (translite=== 'latin' ?  $("#cat23lable").html(this.transliterateLat("КІТАП СӨРЕСІ")):  (translite=== 'arab' ? $("#cat23lable").html(this.transliterateArab("КІТАП СӨРЕСІ")): '' ) );
            translite=== 'cyrillic' ? $("#cat23_1lable").html("БАРЛЫҚ КІТАПТАР") : (translite=== 'latin' ?  $("#cat23_1lable").html(this.transliterateLat("БАРЛЫҚ КІТАПТАР")):  (translite=== 'arab' ? $("#cat23_1lable").html(this.transliterateArab("БАРЛЫҚ КІТАПТАР")): '' ) );
            translite=== 'cyrillic' ? $("#cat28lable").html("БЛОГ") : (translite=== 'latin' ?  $("#cat28lable").html(this.transliterateLat("БЛОГ")):  (translite=== 'arab' ? $("#cat28lable").html(this.transliterateArab("БЛОГ")): '' ) );
            translite=== 'cyrillic' ? $("#socialList").html("ӘЛЕУМЕТТІК  ЖЕЛІДЕМІЗ!") : (translite=== 'latin' ?  $("#socialList").html(this.transliterateLat("ӘЛЕУМЕТТІК  ЖЕЛІДЕМІЗ!")):  (translite=== 'arab' ? $("#socialList").html(this.transliterateArab("ӘЛЕУМЕТТІК  ЖЕЛІДЕМІЗ!")): '' ) );
            translite=== 'cyrillic' ? $("#redaksiaText1").html("РЕДАКЦИЯ") : (translite=== 'latin' ?  $("#redaksiaText1").html(this.transliterateLat("РЕДАКЦИЯ")):  (translite=== 'arab' ? $("#redaksiaText1").html(this.transliterateArab("РЕДАКЦИЯ")): '' ) );
            translite=== 'cyrillic' ? $("#redaksiaText2").html("алқасы") : (translite=== 'latin' ?  $("#redaksiaText2").html(this.transliterateLat("алқасы")):  (translite=== 'arab' ? $("#redaksiaText2").html(this.transliterateArab("алқасы")): '' ) );
            translite=== 'cyrillic' ? $("#nationalText1").html("ҰЛТТЫҚ ҚҰНДЫЛЫҚТАР") : (translite=== 'latin' ?  $("#nationalText1").html(this.transliterateLat("ҰЛТТЫҚ ҚҰНДЫЛЫҚТАР")):  (translite=== 'arab' ? $("#nationalText1").html(this.transliterateArab("ҰЛТТЫҚ ҚҰНДЫЛЫҚТАР")): '' ) );
            translite=== 'cyrillic' ? $("#nationalText2").html("ЭНЦИКЛОПЕДИЯ") : (translite=== 'latin' ?  $("#nationalText2").html(this.transliterateLat("ЭНЦИКЛОПЕДИЯ")):  (translite=== 'arab' ? $("#nationalText2").html(this.transliterateArab("ЭНЦИКЛОПЕДИЯ")): '' ) );

            translite=== 'cyrillic' ? $("#cat17_1").html("КЕҢЕСТЕР") : (translite=== 'latin' ?  $("#cat17_1").html(this.transliterateLat("КЕҢЕСТЕР")):  (translite=== 'arab' ? $("#cat17_1").html(this.transliterateArab("КЕҢЕСТЕР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_2").html("СЕМИНАРЛАР") : (translite=== 'latin' ?  $("#cat17_2").html(this.transliterateLat("СЕМИНАРЛАР")):  (translite=== 'arab' ? $("#cat17_2").html(this.transliterateArab("СЕМИНАРЛАР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_3").html("ТРЕНИНГТЕР") : (translite=== 'latin' ?  $("#cat17_3").html(this.transliterateLat("ТРЕНИНГТЕР")):  (translite=== 'arab' ? $("#cat17_3").html(this.transliterateArab("ТРЕНИНГТЕР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_4").html("ЛЕКЦИЯЛАР") : (translite=== 'latin' ?  $("#cat17_4").html(this.transliterateLat("ЛЕКЦИЯЛАР")):  (translite=== 'arab' ? $("#cat17_4").html(this.transliterateArab("ЛЕКЦИЯЛАР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_5").html("БАПКЕРЛЕР") : (translite=== 'latin' ?  $("#cat17_5").html(this.transliterateLat("БАПКЕРЛЕР")):  (translite=== 'arab' ? $("#cat17_5").html(this.transliterateArab("БАПКЕРЛЕР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_6").html("ГРАНТТАР") : (translite=== 'latin' ?  $("#cat17_6").html(this.transliterateLat("ГРАНТТАР")):  (translite=== 'arab' ? $("#cat17_6").html(this.transliterateArab("ГРАНТТАР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_7").html("КӨРМЕЛЕР") : (translite=== 'latin' ?  $("#cat17_7").html(this.transliterateLat("КӨРМЕЛЕР")):  (translite=== 'arab' ? $("#cat17_7").html(this.transliterateArab("КӨРМЕЛЕР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_8").html("ТЕХНОЛОГИЯЛАР") : (translite=== 'latin' ?  $("#cat17_8").html(this.transliterateLat("ТЕХНОЛОГИЯЛАР")):  (translite=== 'arab' ? $("#cat17_8").html(this.transliterateArab("ТЕХНОЛОГИЯЛАР")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_9").html("КОНКУРС") : (translite=== 'latin' ?  $("#cat17_9").html(this.transliterateLat("КОНКУРС")):  (translite=== 'arab' ? $("#cat17_9").html(this.transliterateArab("КОНКУРС")): '' ) );
            translite=== 'cyrillic' ? $("#cat17_10").html("КӘСІПКЕ ҮЙРЕТУ") : (translite=== 'latin' ?  $("#cat17_10").html(this.transliterateLat("КӘСІПКЕ ҮЙРЕТУ")):  (translite=== 'arab' ? $("#cat17_10").html(this.transliterateArab("КӘСІПКЕ ҮЙРЕТУ")): '' ) );


            translite=== 'cyrillic' ? $("#infographikText").html("ИНФОГРАФИКА") : (translite=== 'latin' ?  $("#infographikText").html(this.transliterateLat("ИНФОГРАФИКА")):  (translite=== 'arab' ? $("#infographikText").html(this.transliterateArab("ИНФОГРАФИКА")): '' ) );
            translite=== 'cyrillic' ? $("#demotovatorsText").html("ДЕМОТИВАТОР") : (translite=== 'latin' ?  $("#demotovatorsText").html(this.transliterateLat("ДЕМОТИВАТОР")):  (translite=== 'arab' ? $("#demotovatorsText").html(this.transliterateArab("ДЕМОТИВАТОР")): '' ) );
            translite=== 'cyrillic' ? $("#pictureSay").html("СУРЕТТЕР СӨЙЛЕГЕНДЕ ...") : (translite=== 'latin' ?  $("#pictureSay").html(this.transliterateLat("СУРЕТТЕР СӨЙЛЕГЕНДЕ ...")):  (translite=== 'arab' ? $("#pictureSay").html(this.transliterateArab("СУРЕТТЕР СӨЙЛЕГЕНДЕ ...")): '' ) );

            translite=== 'cyrillic' ? $("#cat11Text").html("ТАЛҚЫЛАНЫП ЖАТҚАНДАР") : (translite=== 'latin' ?  $("#cat11Text").html(this.transliterateLat("ТАЛҚЫЛАНЫП ЖАТҚАНДАР")):  (translite=== 'arab' ? $("#cat11Text").html(this.transliterateArab("ТАЛҚЫЛАНЫП ЖАТҚАНДАР")): '' ) );

            translite=== 'cyrillic' ? $("#addBook").val("КІТАП ҚОСУ ҮШІН БАСЫҢЫЗ") : (translite=== 'latin' ?  $("#addBook").val(this.transliterateLat("КІТАП ҚОСУ ҮШІН БАСЫҢЫЗ")):  (translite=== 'arab' ? $("#addBook").val(this.transliterateArab("КІТАП ҚОСУ ҮШІН БАСЫҢЫЗ")): '' ) );


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

            if (!this.news11View) {
                this.news11View = new News11View();
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


            if (!this.news18View) {
                this.news18View = new News18View();
            }

            if (!this.videoView) {
                this.videoView = new VideoView();
            }

            if (!this.news19View) {
                this.news19View = new News19View();
            }

            if (!this.news22View) {
                this.news22View = new News22View();
            }

            if (!this.news23View) {
                this.news23View = new News23View();
            }

            if (!this.news24_27View) {
                this.news24_27View = new News24_27View();
            }

            if (!this.news28View) {
                this.news28View = new News28View();
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
    return NewsPageView;
});
