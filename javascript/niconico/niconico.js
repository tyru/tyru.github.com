

function getMovieId(url) {
    if (url.match(/^\w{2}\d+$/)) {
        return url;
    } else if (url.match(/(\w{2}\d+)$/)) {
        return RegExp.$1;
    } else {
        return null;
    }
}

function loadMovie(url) {
    var movieId = getMovieId(url);
    if (movieId == null) return;

    alert(movieId);

    $('preview').src = 'http://ext.nicovideo.jp/thumb_watch/' + movieId;
}

function runOnLoad() {
    var previewHTML = document.createElement('script');
    previewHTML.id = 'preview';
    $('nico').appendChild(previewHTML);
}

addHandler(runOnLoad, window, 'load');

// http://www.nicovideo.jp/watch/nm6764533
// http://ext.nicovideo.jp/thumb_watch/sm4534199
