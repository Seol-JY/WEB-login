"use strict";

 const email = document.querySelector("#email"), 
  name = document.querySelector("#name"),
  password = document.querySelector("#pwd"),
  passwordC = document.querySelector("#pwd_c"),
  sex = document.querySelector("#sex"),
  date = document.querySelector("#date"),
  registerBtn = document.querySelector("#button");

  registerBtn.addEventListener("click", register);

  function register() {
      if (!email.value) return alert("아이디를 입력하세요.");
      if (!password.value) return alert("비밀번호를 입력하세요.");
      if (passwordC.value !== password.value) return alert("비밀번호가 일치하지 않습니다.");
      if (!name.value) return alert("이름을 입력하세요.");
      if (sex.value === 'none') return alert("성별을 선택하세요.");
      if (!date.value) return alert("생년월일을 입력하세요.");
    
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
                location.href = "/login";
            } else {
                alert(res.msg);
            }
        });
        // .catch((err) => {
        //    console.error(new Error("회원가입 중 에러 발생"));
        // });
  };