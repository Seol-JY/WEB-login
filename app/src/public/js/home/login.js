"use strict";

 const email = document.querySelector("#email"), 
  password = document.querySelector("#password"),
  loginbtn = document.querySelector("#login");

  loginbtn.addEventListener("click", login);

  function login() {
      const req = {
          email: email.value,
          password: password.value,
      }
      console.log(req);
  };