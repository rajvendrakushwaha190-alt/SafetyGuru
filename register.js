function register(){

    let username = document.getElementById("newUsername").value.trim();
    let password = document.getElementById("newPassword").value;
    let confirm = document.getElementById("confirmPassword").value;

    if(username==="" || password===""){
        alert("Please fill all fields");
        return;
    }

    if(password!==confirm){
        alert("Passwords do not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users") || "{}");

    if(users[username]){
        alert("Username already exists");
        return;
    }

    users[username]=password;

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created Successfully");

    window.location.href="login.html";

}
