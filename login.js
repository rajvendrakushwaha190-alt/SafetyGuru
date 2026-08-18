function login(){

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;

    if(username==="" || password===""){
        alert("Please enter Username and Password");
        return;
    }

    // Admin Login
    if(username==="admin" && password==="12345"){
        localStorage.setItem("loggedIn","true");
        localStorage.setItem("currentUser","admin");
        window.location.href="index.html";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");

    if(users[username] && users[username]===password){
        localStorage.setItem("loggedIn","true");
        localStorage.setItem("currentUser",username);
        window.location.href="index.html";
    }else{
        alert("Invalid Username or Password");
    }

}


