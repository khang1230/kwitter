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

var user = localStorage.getItem("login")

document.getElementById("welcome").innerHTML = "Welcome " + user

function addRoom(){
    var roomName = document.getElementById("addRoom").value
    firebase.database().ref("/").child(roomName).update({
          purpose:"Adding a room name"
    })
    localStorage.setItem("roomName",roomName)
    document.getElementById("addRoom").value = ""
    window.location = "kwitter_page.html"
}

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
          document.getElementById("output").innerHTML = ""; 
          snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                roomNames = childKey;
                
                rows = "<div id='" + roomNames + "' onclick='redirect(this.id)' class='room_name'>" + roomNames + "</div><hr>"
                document.getElementById("output").innerHTML+= rows
          });
    });
}
getData();

function redirect(roomName){
    window.location = "kwitter_page.html"
    localStorage.setItem("roomName",roomName)
}

function logout(){
    window.location = "index.html"
    localStorage.removeItem("user")
    localStorage.removeItem("roomName")
}