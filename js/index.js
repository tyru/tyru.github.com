

(function () {
    function $(id) {
        return document.getElementById(id);
    }
    if (!Function.prototype.bind) {
        Function.prototype.bind = function (obj) {
            var fn = this;
            return function () {
                return fn.apply(obj);
            }
        }
    }

    // Constant
    var CONSOLE_ID = 'console';
    var PREVIEW_FRAME_ID = 'the_frame';
    var PREVIEW_FRAME_CLASS = 'preview';
    var PEEK_SWITCH_ID = 'sw_peek';
    var PEEK_ON_HTML =
        sprintf('<a href="javascript:void(0);" id="%s">on</a>', PEEK_SWITCH_ID)
    var PEEK_OFF_HTML =
        sprintf('<a href="javascript:void(0);" id="%s">off</a>', PEEK_SWITCH_ID);
    var LINKS_ID = [
        'software',
        'java-applet',
        'javascript',
        'css',
        'misc',
        'hatena-account',
        'blog',
        'delicious',
        'twitter',
        'tumblr',
        'tumblr-photos',
        'tumblr-prog',
        'github',
        'vim-plugin',
        'yahoo-pipes',
    ];


    // Class
    var Console = function () {};
    Console.prototype = {
        clearTimeout: function () {
            if (this.retvalTimeout) {
                clearTimeout(this.retvalTimeout);
                delete this.retvalTimeout;
            }
        },

        clear: function () {
            this.clearTimeout();
            $(CONSOLE_ID).innerHTML = '';
        },

        log: function (msg) {
            this.clearTimeout();
            // XXX escape
            $(CONSOLE_ID).innerHTML = msg;
            this.retvalTimeout = setTimeout(this.clear.bind(this), 3000);
        }
    };
    var console = new Console();

    var FrameManager = function () {};
    FrameManager.prototype = {
        isValidURI: function (uri) {    // TODO
            // return uri && uri.match(/^file:\/\//);
            return uri && uri.match(/^http:\/\//);
        },

        loadURI: function (src) {
            if (!this.isValidURI(src)) {
                console.log("error: not valid URI.");
                return;
            }
            console.log("loading..." + src);

            var frame = $(PREVIEW_FRAME_ID);
            frame.className = PREVIEW_FRAME_CLASS;
            frame.src = src;
        }
    };
    var frameManager = new FrameManager();

    var Link = function (id) {
        this.id = id;
    };
    Link.prototype = {
        showed: false,
        origHTML: '',
        uri: '',

        lazy_build: function () {
            this.origHTML = $(this.id).innerHTML;
            this.uri = $(this.id).firstChild.href;
        },

        loadOnClick: function () {
            frameManager.loadURI(this.uri);
            // this.showed is no longer used.
            // this.showed = true;
        },

        restoreHTML: function () {
            this.showed = false;
            $(this.id).innerHTML = this.origHTML;
        },

        enableAjaxLoad: function () {
            $(this.id).firstChild.href = 'javascript:void(0);';
            addHandler(
                this.loadOnClick.bind(this),
                $(this.id),
                'click'
            );
        },
    };

    var LinkManager = function () {
        this.links = {};
        for (var i = 0; i < LINKS_ID.length; i++) {
            this.links[LINKS_ID[i]] = new Link(LINKS_ID[i]);
        }
    };
    LinkManager.prototype = {
        enabledAjaxLoad: false,

        makeSwitch: function () {
            // a属性にする
            $(PEEK_SWITCH_ID).innerHTML = PEEK_OFF_HTML;
            this.switchHTML = [
                PEEK_OFF_HTML,
                PEEK_ON_HTML
            ];
        },

        runOnClickToggle: function () {

            if (this.enabledAjaxLoad) {
                for (var id in this.links) {
                    this.links[id].restoreHTML();
                }
                $(PEEK_SWITCH_ID).innerHTML = this.switchHTML[0];
                this.enabledAjaxLoad = false;
                console.log("disabled ajax load.");
            }
            else {
                for (var id in this.links) {
                    this.links[id].enableAjaxLoad();
                }
                $(PEEK_SWITCH_ID).innerHTML = this.switchHTML[1];
                this.enabledAjaxLoad = true;
                console.log("＜○＞＜○＞");
                // console.log("enabled ajax load.");
            }
        },

        runOnLoad: function () {
            // リンクをa属性にする
            this.makeSwitch();
            for (var id in this.links) {
                // ページがロードされてからの情報を取得
                this.links[id].lazy_build();
            }

            addHandler(
                this.runOnClickToggle.bind(this),
                $(PEEK_SWITCH_ID),
                'click'
            );
        }
    };
    var linkManager = new LinkManager();

    addHandler(
        linkManager.runOnLoad.bind(linkManager),
        window,
        'load'
    );
})();
