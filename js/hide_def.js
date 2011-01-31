
function runOnLoad() {
    
    function makeExpandLink(node) {
        var aboutLink       = document.createElement('a');
        aboutLink.href      = "javascript: void(0);";
        aboutLink.innerHTML = "説明";

        // イベントハンドラを登録
        addHandler(
            function () {
                this.style.display = "block";
                this.parentNode.replaceChild(node, this);
            },
            aboutLink,
            'click'
        );

        return aboutLink;
    }
    

    var aboutNodes = document.getElementsByName("about");
    for (var i = 0; i < aboutNodes.length; i++) {
        var node = aboutNodes.item(i);
        if (node.getAttribute("class") === "about") {
            // 「説明」と書かれたリンク要素をnodeの前に追加
            node.parentNode.insertBefore(
                document.createElement('br'),
                node
            );
            node.parentNode.insertBefore(
                makeExpandLink(node.cloneNode(true)),    // nodeは参照型
                node
            );
            // 説明を隠す
            node.style.display = "none";
        }
    }

}

addHandler(runOnLoad, window, 'load');
