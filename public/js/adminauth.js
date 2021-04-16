if (location.hostname === "localhost") {
    firebase.auth().useEmulator("http://localhost:9099");
}

function Login() {
    ResetError("auth_error");
    const email = document.getElementById("auth_email").value;
    const password = document.getElementById("auth_password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
        console.log("AUTH COMPLETED");
        //window.location.href = "/admin";
    }).catch((error) => {
        SetError("auth_error",error.message);
    });
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user.uid);
    } else {
        console.log("NO USER");
        window.location.href =  "/admin-auth";
    }
});