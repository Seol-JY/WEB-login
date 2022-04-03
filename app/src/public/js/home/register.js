"use strict";

 const email = document.querySelector("#email"),
  email_chk_err = document.querySelector("#email_chk_err"),
  email_err = document.querySelector("#email_err"),
  name = document.querySelector("#name"),
  name_err = document.querySelector("#name_err"),
  password = document.querySelector("#pwd"),
  password_chk_err = document.querySelector("#pwd_chk_err"),
  password_err = document.querySelector("#pwd_err"),
  passwordC = document.querySelector("#pwd_c"),
  passwordC_err = document.querySelector("#pwd_c_err"),
  sex = document.querySelector("#sex"),
  sex_err = document.querySelector("#sex_err"),
  date = document.querySelector("#date"),
  date_err = document.querySelector("#date_err"),

  registerBtn = document.querySelector("#button");
  registerBtn.addEventListener("click", register);


  const check = () => {
    let cnt=0;
    if (!email.value) {email.style.borderColor = "#ff4747";email_err.style.display="block";cnt++}
    else {
        email.style.borderColor = "rgb(0,0,0,.2)";
        email_err.style.display="none";
        const email1RegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if (!email1RegExp.test(email.value)) {
            email.style.borderColor = "#ff4747";email_chk_err.style.display="block";cnt++
        } else {
            email.style.borderColor = "rgb(0,0,0,.2)";
            email_chk_err.style.display="none"
        }
    }

    if (!password.value) {password.style.borderColor = "#ff4747";password_err.style.display="block";cnt++}
    else {
        password.style.borderColor = "rgb(0,0,0,.2)";
        password_err.style.display="none";
        const password1RegExp = /^[a-zA-z0-9]{8,16}$/;
        if (!password1RegExp.test(password.value)) {
            password.style.borderColor = "#ff4747";password_chk_err.style.display="block";cnt++
        } else {
            password.style.borderColor = "rgb(0,0,0,.2)";
            password_chk_err.style.display="none"
        }
    }
    if (passwordC.value !== password.value) {passwordC.style.borderColor = "#ff4747";passwordC_err.style.display="block";cnt++}
    else {
        passwordC.style.borderColor = "rgb(0,0,0,.2)";
        passwordC_err.style.display="none";
    }
    if (!name.value) {name.style.borderColor = "#ff4747";name_err.style.display="block";cnt++}
    else {
        name.style.borderColor = "rgb(0,0,0,.2)";
        name_err.style.display="none";
    }
    if (sex.value === 'none') {sex.style.borderColor = "#ff4747";sex_err.style.display="block";cnt++}
    else {
        sex.style.borderColor = "rgb(0,0,0,.2)";
        sex_err.style.display="none";
    }
    if (!date.value) {date.style.borderColor = "#ff4747";date_err.style.display="block";cnt++}
    else {
        date.style.borderColor = "rgb(0,0,0,.2)";
        date_err.style.display="none";
    }
    return cnt;
  }

  
  function register() {
      const cnt = check();
      if (cnt) return alert("회원가입에 실패하였습니다.");
    
      const req = {
          email: email.value,
          name: name.value,
          password: password.value,
          sex: sex.value,
          date: date.value
      };

      fetch("/register",{
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(req),
      }).then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = "/registerSuccess";
            } else {
                alert(res.msg);
            }
        })
         .catch((err) => {
            console.error(new Error("회원가입 중 에러 발생"));
         });
  };