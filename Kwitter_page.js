const firebaseConfig = {
    apiKey: "AIzaSyD9xjcMqhkAkz_RaRwHkh7KgcMATg0DlFY",
    authDomain: "kwitter-project-7b9f2.firebaseapp.com",
    databaseURL: "https://kwitter-project-7b9f2-default-rtdb.firebaseio.com",
    projectId: "kwitter-project-7b9f2",
    storageBucket: "kwitter-project-7b9f2.appspot.com",
    messagingSenderId: "697321779541",
    appId: "1:697321779541:web:3024f58a88db8397c63fdc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig); 

var userName = localStorage.getItem("login")
var roomName = localStorage.getItem("roomName")

function getData() {
    firebase.database().ref("/" + roomName).on('value', function (snapshot) {
          document.getElementById("output").innerHTML = "";
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                childData = childSnapshot.val();
                if (childKey != "purpose") {
                      firebaseMessageId = childKey;
                      messageData = childData;
                      console.log(firebaseMessageId)
                      console.log(messageData)
                      var name = messageData["name"]
                      var message = messageData["message"]
                      var likes = messageData["likes"]
                      var nameTag = "<h4>" + name + "</h4>"
                      var messageTag = "<h4 class='message_h4'>" + message + "</h4>"
                      var likesBtn = "<button onclick='thumbsUp(this.id)'class='btn btn-warning' id='" + firebaseMessageId + "' value='" + likes + "'>"
                      var subTag = "<span class='glyphicon glyphicon-thumbs-up'></span>" + likes + "</button><hr>"
                      var rows = nameTag + messageTag + likesBtn + subTag
                      document.getElementById("output").innerHTML += rows
                }
          });
    });
}
getData();

function thumbsUp(buttonID){
    var getLikes = document.getElementById(buttonID).value
    getLikes = Number(getLikes) + 1
    console.log(getLikes)
    firebase.database().ref(roomName).child(buttonID).update({
          likes:getLikes
    })
}

function go() {
    var message = document.getElementById("messages").value
    firebase.database().ref(roomName).push({
          name: userName,
          message: message,
          likes: 0
    })
    document.getElementById("messages").value = ""
}

function logout() {
    window.location = "index.html"
    localStorage.removeItem("login")
    localStorage.removeItem("roomName")
}