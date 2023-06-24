let signUpBtn = document.querySelector(".signup-btn");
let logoutBtn = document.querySelector(".logout-btn");

if (signUpBtn) {
  signUpBtn.addEventListener("click", (event) => {
    event.preventDefault();
    //console.log("clicking sign button");
    SignUpfn();
  });
}

if (logoutBtn) {
  //logout button
  logoutBtn.addEventListener("click", () => {
    let userInfo = {
      fullname: null,
      email: null,
      password: null,
      confirmPassword: null,
    };

    //save user null state to local storage
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.location.href = "index.html";
  });
}

//function to create the user details

function SignUpfn() {
  let userFullName = document.querySelector(".full-name").value;
  let userEmail = document.querySelector(".email").value;
  let password = document.querySelector(".password").value;
  let confirmPassword = document.querySelector(".confirm-password").value;

  if (
    userFullName === "" ||
    userEmail === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    displyMessage("Error : All the fields are mandatory", "red");
  } else {
    let accessToken = generateAccessToken();

    const user = {
      fullname: userFullName,
      email: userEmail,
      password: password,
      confirmPassword: confirmPassword,
      accessToken: accessToken,
    };

    //save user state to local storage
    localStorage.setItem("user", JSON.stringify(user));

    //success message

    displyMessage("Successfully Signed Up!", "green");

    setTimeout(() => {
      //redirect to profile page
      window.location.href = "profile.html";
    }, 2000);
  }
}

//generate access token
function generateAccessToken() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 16; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
}

//onload function to check access token..if it exist in local storage then redirect to profile page

function onload() {
  let userInfo = localStorage.getItem("user");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    if (userInfo.accessToken) {
      //redirect to profile page
      window.location.href = "profile.html";
    }
  }
}

//show message

function displyMessage(msg, color) {
  let div = document.querySelector(".message");

  div.innerText = msg;
  div.style.color = color;
}

//profile onload

function profileOnload() {
  let userInfo = localStorage.getItem("user");
  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    if (!userInfo.accessToken) {
      window.location.href = "index.html";
    } else {
      document.querySelector(".fullname").innerHTML =
        "Fullname : " + userInfo.fullname;
      document.querySelector(".email").innerHTML = "Email : " + userInfo.email;
      document.querySelector(".password").innerHTML =
        "Password : " + userInfo.password;
    }
    //redirect to profile page
  }
}
