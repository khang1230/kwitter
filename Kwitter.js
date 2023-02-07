var login

function addUser(){
    login = document.getElementById("user").value
    localStorage.setItem("login",login)
    window.location = "kwitter_room.html"
}