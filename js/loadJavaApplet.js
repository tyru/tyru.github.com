
var appletElem;
var appletId = "japplet";


function loadApplet(node, appName, width, height) {
    if (appletElem != null) return;

    appletElem        = document.createElement('applet');
    appletElem.code   = appName;
    appletElem.width  = width;
    appletElem.height = height;
    appletElem.id     = appletId;
    appletElem.style.display = "block";

    node.appendChild(appletElem);
}
