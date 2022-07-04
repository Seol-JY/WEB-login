"use strict";

 const email = document.querySelector("#email"), 
  password = document.querySelector("#password"),
  loginbtn = document.querySelector("#button"),
  kakaologinbtn = document.querySelector("#kakao"),
  keepchk = document.querySelector("#keep");

loginbtn.addEventListener("click", login);
document.querySelector("#main").addEventListener("keyup", enterlogin);

function enterlogin(e) {
    if (e.keyCode == 13) login();
}

function login() {
    const req = {
        email: email.value,
        password: password.value,
        keepchk: keepchk.checked
    }

    fetch("/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    }).then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.log(err);
        console.error(new Error("로그인 중 에러 발생"));
    });
};