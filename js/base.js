

// 文字列のみ対応
function sprintf() {
    var fmt = arguments[0];
    for (var i = 1; i < arguments.length; i++)
        fmt = fmt.replace('%s', arguments[i]);
    return fmt;
}

function addHandler(func, where, e) {
    if (where === undefined) return false;

    if (where.addEventListener) {
        return where.addEventListener(e, func, false);
    } else if (where.attachEvent) {
        return where.attachEvent('on' + e, func);
    } else {
        return where['on' + e] = func;
    }
}

//XMLHttpRequestオブジェクト生成
function createXMLHttpRequest(){

    //Win ie用
    if(window.ActiveXObject){
        try {
            //MSXML2以降用
            return new ActiveXObject("Msxml2.XMLHTTP") //[1]'
        } catch (e) {
            try {
                //旧MSXML用
                return new ActiveXObject("Microsoft.XMLHTTP") //[1]'
            } catch (e2) {
                return null
            }
        }
    } else if(window.XMLHttpRequest){
        //Win ie以外のXMLHttpRequestオブジェクト実装ブラウザ用
        return new XMLHttpRequest() //[1]'
    } else {
        return null
    }
}

function requestHttp(func, method, href, async, data) {
    var http = createXMLHttpRequest();
    if (http == null) return null;

    http.open(method, href, async == null ? true : false);
    http.onreadystatechange = function () {
        if (http.readyState == 4)
            func(http);
    };
    http.send(data);
}

// hrefの内容をid以下に表示する
// (その際に空白などをHTML用に変換する)
function showSource(href, id) {
    requestHttp(
        function (http) {
            document.getElementById(id).style.backgroundColor = "#DDD";
            var codeText = http.responseText;
            // HTML用に変換
            codeText = codeText.replace(
                /(\s)/g,
                function (text, space) {
                    return space == '\n' ?
                           '<br />' :
                           space == ' ' ?
                           '&nbsp;' :
                           space == '\t' ?
                           '    ' :    // タブ幅は4
                           space;
                }
            );
            document.getElementById(id).innerHTML = codeText;
        },
        "GET",
        href
    );
}
