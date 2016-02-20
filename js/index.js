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

    // Vi-like keybindings.
    // Move across <a> links.
    // Enter to open it.
    var selectingLink = -1;
    window.onkeydown = (function onkeydown(e) {
        // Add & Remove highlights
        function highlightCurrent($allLinks, selectingLink) {
            var i;
            for (i = 0; i < $allLinks.length; ++i) {
                if (i === selectingLink) {
                    $allLinks[i].classList.add('selected-link');
                } else {
                    $allLinks[i].classList.remove('selected-link');
                }
            }
        }

        var ch, $allLinks;
        e = e || event;
        ch = String.fromCharCode(e.keyCode);
        console.log("key: '" + ch + "' (" + e.keyCode + ")");
        $allLinks = document.querySelectorAll('#links a, #old-content a');
        // Handle keys
        switch (e.keyCode) {
        case 13:    // Enter: Open current selected link.
            if (0 <= selectingLink && selectingLink < $allLinks.length) {
                $allLinks[selectingLink].classList.remove('selected-link');
                setTimeout(function () {
                    $allLinks[selectingLink].classList.add('selected-link');
                    $allLinks[selectingLink].click();
                }, 50);
            }
            break;
        case 27:    // Escape: Clear current selection.
            selectingLink = -1;
            break;
        case 74:    // 'J': Select the next below link.
            selectingLink++;
            selectingLink = Math.max(selectingLink, 0);
            selectingLink = Math.min(selectingLink, $allLinks.length - 1);
            highlightCurrent($allLinks, selectingLink);
            break;
        case 75:    // 'K': Select the next above link.
            selectingLink--;
            selectingLink = Math.max(selectingLink, 0);
            selectingLink = Math.min(selectingLink, $allLinks.length - 1);
            highlightCurrent($allLinks, selectingLink);
            break;
        }
    });
});
