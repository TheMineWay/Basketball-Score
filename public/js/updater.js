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
    "stage": document.getElementsByClassName("current_stage")
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
    } catch(error) {
        console.log(error.message);
    }
}