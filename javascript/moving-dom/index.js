
// NOTE: 要jQuery


$(document).ready(function () {

    var obj = {

        moveX: 30,
        moveY: 30,

        namerakasa: 30,

        hankei: 20,

        upKey: 'K',
        downKey: 'J',
        leftKey: 'H',
        rightKey: 'L',

        move:  function (opt) { $("#object").animate(opt, obj.namerakasa); },
        up:    function () { obj.move({"top":  "-=" + obj.moveY + "px"}); },
        down:  function () { obj.move({"top":  "+=" + obj.moveY + "px"}); },
        left:  function () { obj.move({"left": "-=" + obj.moveX + "px"}); },
        right: function () { obj.move({"left": "+=" + obj.moveX + "px"}); },

        // その方向へのキーが押されているかのフラグ
        movingTo: { up: false, down: false, left: false, right: false }
    };

    // プレイヤーの大きさを設定
    var obj_id = document.getElementById('object');
    obj_id.style.width = obj_id.style.height = (obj.hankei * 2) + "px";

    // キーハンドラ
    $(window).keydown(function (e) {
        switch (String.fromCharCode(e.keyCode)) {
            case obj.downKey:  obj.movingTo.down  = true; break;
            case obj.upKey:    obj.movingTo.up    = true; break;
            case obj.leftKey:  obj.movingTo.left  = true; break;
            case obj.rightKey: obj.movingTo.right = true; break;
        }
    });
    $(window).keyup(function (e) {
        switch (String.fromCharCode(e.keyCode)) {
            case obj.downKey:  obj.movingTo.down  = false; break;
            case obj.upKey:    obj.movingTo.up    = false; break;
            case obj.leftKey:  obj.movingTo.left  = false; break;
            case obj.rightKey: obj.movingTo.right = false; break;
        }
    });



    var stage = {
        fps:    15.0,

        mainLoop: function () {
            if (obj.movingTo.up)    obj.up();
            if (obj.movingTo.down)  obj.down();
            if (obj.movingTo.left)  obj.left();
            if (obj.movingTo.right) obj.right();
        }
    };

    stage.timer_id = setInterval(stage.mainLoop, 1000.0 / stage.fps);
});
