console.log("Code made by TheMineWay (Joel Campos Oliva)");
console.log("See the project on GitHub:\nhttps://github.com/TheMineWay/Basketball-Score")
var db = firebase.firestore();
if (location.hostname === "localhost") {
    db.useEmulator("localhost", 8080);
}

function SetError(where, error) {
    const el = document.getElementById(where);
    el.innerHTML = `<div class="alert alert-danger" role="alert">
        ${error}
    </div>`;
    el.removeAttribute("hidden");
}
function ResetError(where) {
    document.getElementById(where).setAttribute("hidden","");
}
function SetInfo(where,message) {
    const el = document.getElementById(where);
    el.innerHTML = `<div class="alert alert-info" role="alert">
        ${message}
    </div>`;
    el.removeAttribute("hidden");
}