window.onload = (function() {
    'use strict';

    var BGIMG_TARGET_ID = 'bg-icon';
    function showIconOnHover(linkId, bgImgAddClass) {
        var $bgImg = document.getElementById(BGIMG_TARGET_ID);
        var $link = document.getElementById(linkId);
        var $linkDesc = document.getElementById(linkId + "-desc");

        var onMouseOver = (function onMouseOver() {
            $bgImg.classList.add(bgImgAddClass);
            $bgImg.classList.remove('invisible');
            $linkDesc.classList.remove('invisible');
            return false;
        });
        var onMouseOut = (function onMouseOut() {
            $linkDesc.classList.add('invisible');
            $bgImg.classList.add('invisible');
            $bgImg.classList.remove(bgImgAddClass);
            return false;
        });

        $link.addEventListener('mouseover', onMouseOver);
        $link.addEventListener('mouseout', onMouseOut);
    }

    // On mouseover/mouseout.
    // * Load & Show background images on mouseover.
    // * Show descriptions on mouseover.
    // * Toggle 'invisible' class.
    showIconOnHover('github', 'github-bg-icon');
    showIconOnHover('hatenablog', 'hatenablog-bg-icon');
    showIconOnHover('hatebu', 'hatebu-bg-icon');
    showIconOnHover('twitter', 'twitter-bg-icon');
    showIconOnHover('tumblr-tyru', 'tumblr-bg-icon');
    showIconOnHover('tumblr-inthesea', 'tumblr-bg-icon');
    showIconOnHover('vimorg', 'vimorg-bg-icon');
});
