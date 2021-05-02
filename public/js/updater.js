//Client side public behaviour (NOAUTH)
const score = {
    "local":{
        "name": document.getElementsByClassName("local_name"),
        "score": document.getElementsByClassName("local_score")
    },
    "visitor":{
        "name": document.getElementsByClassName("visitor_name"),
        "score": document.getElementsByClassName("visitor_score")
    },
    "stage": document.getElementsByClassName("current_stage"),
    "timer": document.getElementsByClassName("current_time")
}

function InitListener() {
    db.collection("game").doc("game").onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        UpdateScoreboard(doc.data());
    });
}
function UpdateScoreboard(_data) {
    try {
        for(const el of score.local.name) el.innerText = _data.local_name;
        for(const el of score.local.score) el.innerText = _data.local_score;
        for(const el of score.visitor.name) el.innerText = _data.visitor_name;
        for(const el of score.visitor.score) el.innerText = _data.visitor_score;
        for(const el of score.stage) el.innerText = _data.stage;
        Timer(_data.timer);
    } catch(error) {
        console.log(error.message);
    }
}

// TIMER
let timer = {
    m: 0,
    s: 0
};
let action = null;

function Timer(_timer) {
    action = _timer.action;
    lastcounterupdate = _timer.lastupdate;
    console.log("timer");
    console.log(_timer);
    if(action.includes("set")) {
        UpdateTimer(_timer.master.m, _timer.master.s);
        if(!action.includes("pause")) action = "";
        else action = "pause";
    }
}

function UpdateTimer(m, s) {
    timer.m = m;
    timer.s = s;
    for(const el of score.timer) el.innerText = `${m < 10 ? '0' + m : m} : ${s < 10 ? '0' + s : s}`; // Display timer
}
function DecrementTimer() {
    let s = timer.s - 1;
    let m = timer.m;
    if(s < 0) {
        s = 59;
        m--;
    }
    if(m < 0) return;
    UpdateTimer(m,s);
}

setInterval(() => {
    if(action === null || action.includes("pause")) return;
    if(!action.includes("set")) DecrementTimer();
},1000);