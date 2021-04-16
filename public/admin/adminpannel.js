//ADMIN PANNEL (AUTH REQUIRED)
const DBdoc = db.collection("game").doc("game");

let testing = false;
if (location.hostname === "localhost") {
    testing = true;
    firebase.auth().useEmulator("http://localhost:9099");
    //firebase.auth().signInWithEmailAndPassword("admin@gmail.com", "Admin1234"); //<-- FIREBASE BUG EMULATOR SOLUTION
}

let currentOBJ = {
    local_score: 0,
    visitor_score: 0
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.uid);
        let admin_elements = [];
        for(const el of (document.getElementsByTagName("input"))) admin_elements.push(el);
        for(const el of (document.getElementsByTagName("button"))) admin_elements.push(el);
        db.collection("admin").doc(user.uid).onSnapshot((doc) => {
            if(doc.data().admin == true) {
                for(const el of admin_elements) el.disabled = false;
            } else {
                for(const el of admin_elements) el.disabled = true;
            }
        });
    } else {
        console.log("NO USER");
        if(!testing) window.location.href =  "/admin-auth";
    }
});

function Logout() {
    firebase.auth().signOut().then(() => {
        window.location.href =  "/admin-auth";
    });
}

function InitCustomListener() {
    DBdoc.onSnapshot((doc) => {
        UpdateScoreboard(doc.data());
        currentOBJ.visitor_score = doc.data().visitor_score;
        currentOBJ.local_score = doc.data().local_score;

        document.getElementById("local_score_input").value = currentOBJ.local_score;
        document.getElementById("visitor_score_input").value = currentOBJ.visitor_score;
    });
}
InitCustomListener();

function Send(to, score) {
    if(score < 0  || typeof(score) != "number") score = 0;
    const el = to == 'local' ? document.getElementById("local_score_input") : document.getElementById("visitor_score_input");
    el.value = score;
    if(to == 'local') currentOBJ.local_score = score;
    else currentOBJ.visitor_score = score;
    UI_Update();
    DBdoc.update(currentOBJ).catch((error) => {
        console.log(error.message);
    });
}

function Increment(to, score) {
    const last = to == 'local' ? currentOBJ.local_score : currentOBJ.visitor_score;
    Send(to,last + score);
}

function SendInputValue(to) {
    const el = to == 'local' ? document.getElementById("local_score_input") : document.getElementById("visitor_score_input");
    Send(to, parseInt(el.value,10) || 0);
}

function InternalIncrement(to, by) {
    const el = to == 'local' ? document.getElementById("local_score_input") : document.getElementById("visitor_score_input");
    el.value = parseInt(el.value,10) + by;
    if(parseInt(el.value,10) < 0) el.value = 0;
    UI_Update();
}

function Restore(to) {
    const el = to == 'local' ? document.getElementById("local_score_input") : document.getElementById("visitor_score_input");
    const val = to == 'local' ? currentOBJ.local_score : currentOBJ.visitor_score;
    el.value = val;
    UI_Update();
}
function Cleanase(to) {
    const el = to == 'local' ? document.getElementById("local_score_input") : document.getElementById("visitor_score_input");
    el.value = 0;
    UI_Update();
}

document.getElementById("fast_actions_enable").addEventListener('input',() => {
    if(document.getElementById("fast_actions_enable").checked) EnableByClassName("fast-actions");
    else DisableByClassName("fast-actions");
});

function EnableByClassName(name) {
    for(const el of document.getElementsByClassName(name)) el.removeAttribute("hidden");
}
function DisableByClassName(name) {
    for(const el of document.getElementsByClassName(name)) el.setAttribute("hidden","");
}

function UI_Update() {
    if(document.getElementById("local_score_input").value != currentOBJ.local_score.toString()) {
        document.getElementById("local_send").classList.add("btn-warning");
        document.getElementById("local_send").classList.remove("btn-primary");
    } else {
        document.getElementById("local_send").classList.remove("btn-warning");
        document.getElementById("local_send").classList.add("btn-primary");
    }
    if(document.getElementById("visitor_score_input").value != currentOBJ.visitor_score.toString()) {
        document.getElementById("visitor_send").classList.add("btn-warning");
        document.getElementById("visitor_send").classList.remove("btn-primary");
    } else {
        document.getElementById("visitor_send").classList.remove("btn-warning");
        document.getElementById("visitor_send").classList.add("btn-primary");
    }
}

document.getElementById("local_score_input").addEventListener('input', () => UI_Update());
document.getElementById("visitor_score_input").addEventListener('input', () => UI_Update());