async function signupAction() {
    //Get the details of the user from the HTML page
    let firstName = document.getElementById("firstname").value;
    let lastName = document.getElementById("lastname").value;
    let email = document.getElementById("mailid").value;
    const data = {
        first_name: firstName,
        last_name: lastName,
        email_id: email,
        platform_type: "web",
    };
    const auth = catalyst.auth;
    //The signup method will sign up the user with the specified data
    const signupresponse = await auth.signUp(data);
    if (signupresponse.status == 200) {
        document.body.innerHTML =
            "An account verification email has been sent to your email address";
        setTimeout(function () {
            location.reload();
        }, 5000);
    } else {
        alert(signupresponse.message);
        location.reload();
    }
}

function showProfile() {
    //The catalyst.auth.isUserAuthenticated() method allows only authenticated users, i.e., the users who are logged in, to access the pages
    catalyst.auth
        .isUserAuthenticated()
        .then((result) => {
            //If the user is logged in, these contents of the page will be displayed to the user
            const first_name = "First Name: " + result.content.first_name;
            document.getElementById("fname").innerHTML = first_name;

            const last_name = "Last Name: " + result.content.last_name;
            document.getElementById("lname").innerHTML = last_name;

            const mailid = "Email Address: " + result.content.email_id;
            document.getElementById("mailid").innerHTML = mailid;

            const tzone = "Time Zone: " + result.content.time_zone;
            document.getElementById("tzone").innerHTML = tzone;

            const created_time = " Joined On: " + result.content.created_time;
            document.getElementById("ctime").innerHTML = created_time;

            document.getElementById("profile").style.display = "block";
        })
        .catch((err) => {
            document.getElementById("profile").style.display = "block";
            document.body.innerHTML =
                "You are not logged in. Please log in to continue. Redirecting you to the login page..";
            setTimeout(function () {
                window.location.href = "index.html";
            }, 3000);
        });
}

function logout() {
    //The signOut method is used to sign the user out of the application
    const redirectURL = "/";
    catalyst.auth.signOut(redirectURL);
}

function showDiv() {
    debugger;
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
    document.getElementById("buttons").style.display = "none";
}
