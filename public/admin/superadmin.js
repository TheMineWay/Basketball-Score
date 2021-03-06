function RegenerateDB() {
    console.log("CREATING INITIAL DATA...");
    firebase.firestore().collection("game").doc("game").set({
        local_score:0,
        visitor_score:0,
        local_name:"LOCAL",
        visitor_name:"VISITOR",
        stage:1,
        timer: {
            action:null,
            master: {
                m: 5,
                s: 55
            },
            animations: true,
            lastupdate: new Date()
        }
    }).then(() => {
        console.log("BBDD UPDATED!");
    }).catch((error) => {
        console.log(error.message);
    });
}