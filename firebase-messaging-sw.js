importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js");

firebase.initializeApp({
    apiKey: "AIzaSyD5mbV_olX_gqFX0Qf2AsLCfdDP-LdsAiw",
    authDomain: "quickcare-22cba.firebaseapp.com",
    databaseURL: "https://quickcare-22cba-default-rtdb.firebaseio.com",
    projectId: "quickcare-22cba",
    storageBucket: "quickcare-22cba.appspot.com",
    messagingSenderId: "261877223607",
    appId: "1:261877223607:web:2ef6f5657dcbe5d8ba3d32"
});

const messaging = firebase.messaging();

// Optional:
messaging.onBackgroundMessage((message) => {
    console.log("onBackgroundMessage", message);
});