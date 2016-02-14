window.onload = (function () {
    'use strict';

    function showIconOnHover(watchTargetClass, addClass) {
        var ADD_TARGET_ID = 'links';
        var target = document.getElementById(ADD_TARGET_ID);
        var watchDOMList = document.getElementsByClassName(watchTargetClass);
        var i;
        for (i = 0; i < watchDOMList.length; i++) {
            watchDOMList[i].onmouseover = function () {
                target.classList.add(addClass);
            };
            watchDOMList[i].onmouseout = function () {
                target.classList.remove(addClass);
            };
        }
    }

    showIconOnHover('github', 'github-bg-icon');
    showIconOnHover('hatenablog', 'hatenablog-bg-icon');
    showIconOnHover('hatebu', 'hatebu-bg-icon');
    showIconOnHover('twitter', 'twitter-bg-icon');
    showIconOnHover('tumblr', 'tumblr-bg-icon');
    showIconOnHover('vimorg', 'vimorg-bg-icon');
});
