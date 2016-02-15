window.onload = (function() {
    'use strict';

    function showDescAndIconOnHover(linkId, bgImgId) {
        var $bgImg = document.getElementById(bgImgId);
        var $link = document.getElementById(linkId);
        var $linkDesc = document.getElementById(linkId + "-desc");

        var onMouseOver = (function onMouseOver() {
            $bgImg.classList.remove('invisible');
            $linkDesc.classList.remove('invisible');
            return false;
        });
        var onMouseOut = (function onMouseOut() {
            $linkDesc.classList.add('invisible');
            $bgImg.classList.add('invisible');
            return false;
        });

        $link.addEventListener('mouseover', onMouseOver);
        $link.addEventListener('mouseout', onMouseOut);
    }

    // On mouseover/mouseout.
    // * Show background images on mouseover.
    // * Show descriptions on mouseover.
    showDescAndIconOnHover('github', 'github-bg-icon');
    showDescAndIconOnHover('hatebu', 'hatebu-bg-icon');
    showDescAndIconOnHover('hatenablog', 'hatenablog-bg-icon');
    showDescAndIconOnHover('twitter', 'twitter-bg-icon');
    showDescAndIconOnHover('tumblr-tyru', 'tumblr-bg-icon');
    showDescAndIconOnHover('tumblr-inthesea', 'tumblr-bg-icon');
    showDescAndIconOnHover('vimorg', 'vimorg-bg-icon');
});
