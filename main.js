async function signupAction() {
    //Get the details of the user from the HTML page
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var email = document.getElementById("mailid").value;
    //Create a JSON to use the details for the user sign-up
    var data = {
    first_name: firstName,
    last_name: lastName,
    email_id: email,
    platform_type: "web",
    };
    var auth = catalyst.auth;
    //The signup method will sign up the user with the specified data
    var signupresponse = await auth.signUp(data);
    if (signupresponse.status == 200) {
    //If the signup is successful, the user will be asked to check their email
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
    //You can load this method in the body of your page to allow only authenticated users to access a particular page
    catalyst.auth
    .isUserAuthenticated()
    .then((result) => {
    //If the user is logged in, these contents of the page will be displayed to the user
      var first_name = "First Name: " + result.content.first_name;
      document.getElementById("fname").innerHTML = first_name;
      var last_name = "Last Name: " + result.content.last_name;
      document.getElementById("lname").innerHTML = last_name;
      var mailid = "Email Address: " + result.content.email_id;
      document.getElementById("mailid").innerHTML = mailid;
      var tzone = "Time Zone: " + result.content.time_zone;
      document.getElementById("tzone").innerHTML = tzone;
      var created_time = " Joined On: " + result.content.created_time;
      document.getElementById("ctime").innerHTML = created_time;
      document.getElementById("profile").style.display = "block";
    })
    .catch((err) => {
      //If the user is not logged in, this will be displayed to the user and they will be redirected to the login page
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
    var redirectURL = "/";
    catalyst.auth.signOut(redirectURL);
    }

    function showDiv() {
    debugger;
    document.getElementById("login").style.display = "none";
    document.getElementById("signup").style.display = "block";
    document.getElementById("buttons").style.display = "none";
    }
    