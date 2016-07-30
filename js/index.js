window.onload = (function() {
    'use strict';

    var MOBILE_MEDIA = '(max-width: 600px)';

    function showDescAndIconOnHover(linkId, bgImgId) {
        var $bgImg = document.getElementById(bgImgId);
        var $link = document.getElementById(linkId);
        var $linkDesc = document.getElementById(linkId + "-desc");

        var onMouseOver = (function onMouseOver() {
            if (window.matchMedia(MOBILE_MEDIA).matches) {
                return;
            }
            $bgImg.classList.remove('invisible');
            $linkDesc.classList.remove('invisible');
            return false;
        });
        var onMouseOut = (function onMouseOut() {
            if (window.matchMedia(MOBILE_MEDIA).matches) {
                return;
            }
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
    [
      'github', 'hatebu', 'hatenablog', 'twitter', 'soundcloud',
      ['tumblr-tyru', 'tumblr-bg-icon'], ['tumblr-inthesea', 'tumblr-bg-icon'],
      'vimorg', 'flickr'
    ].map(function (linkId) {
      if (Array.isArray(linkId)) {
        showDescAndIconOnHover(linkId[0], linkId[1]);
      } else {
        showDescAndIconOnHover(linkId, linkId + '-bg-icon');
      }
    });

    // Vi-like keybindings.
    // Move across <a> links.
    // Enter to open it.
    (function() {
        var selectingLink = -1;
        if (window.matchMedia(MOBILE_MEDIA).matches) {
            return;
        }
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
            function fireEvent($el, eventName) {
                var event = document.createEvent("MouseEvents");
                event.initEvent(eventName, false, true);
                $el.dispatchEvent(event);
            }
            function handleJK($allLinks, selectingLink, step) {
                var prevLink = selectingLink;
                selectingLink += step;
                selectingLink = Math.max(selectingLink, 0);
                selectingLink = Math.min(selectingLink, $allLinks.length - 1);
                // Add & Remove highlights
                highlightCurrent($allLinks, selectingLink);
                // Fire mouseover/mouseout events.
                if (0 <= prevLink && prevLink < $allLinks.length) {
                    fireEvent($allLinks[prevLink], 'mouseout');
                }
                fireEvent($allLinks[selectingLink], 'mouseover');
                return selectingLink;
            }
            function handleEscape($allLinks, selectingLink) {
                var prevLink = selectingLink;
                selectingLink = -1;
                // Add & Remove highlights
                highlightCurrent($allLinks, selectingLink);
                // Fire mouseover/mouseout events.
                if (0 <= prevLink && prevLink < $allLinks.length) {
                    fireEvent($allLinks[prevLink], 'mouseout');
                }
                return selectingLink;
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
                selectingLink = handleEscape($allLinks, selectingLink);
                break;
            case 74:    // 'J': Select the next below link.
                selectingLink = handleJK($allLinks, selectingLink, +1);
                break;
            case 75:    // 'K': Select the next above link.
                selectingLink = handleJK($allLinks, selectingLink, -1);
                break;
            }
        });
    })();
});
