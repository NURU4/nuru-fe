import React, { useState } from 'react';
//login-nuru


const Nuru = () => {
    const [USER_EMAIL, setEmail] = useState("");
    const [USER_PW, setPw] = useState("");
    const [emailValid, setEmailValid] = useState(0);
    const [pwValid, setPwValid] = useState(0);

    const checkEmail = (event) => {
        console.log(event.target.value.indexOf('@'))
        let isValid = event.target.value.indexOf('@')
        if (isValid > 0) { //check value is e-mail or not
            setEmailValid({emailValid : 1});
        }
        else{
            setEmailValid({emailValid : 0});
        }
        setEmail({USER_EMAIL: event.target.value});
    };

    const checkPassword = (event) => { 
        if (event.target.value.length >= 6) { 
            setPwValid({pwValid : 1});
        }
        else{
            setPwValid({pwValid : 0});
        }
        setPw({USER_PW: event.target.value});
    }

    const submitInfo = () => {
        console.log(emailValid)
        console.log(pwValid)
        if (!emailValid["emailValid"] || !pwValid["pwValid"]){
            console.log("이메일 혹은 패스워드 형식이 부적절합니다")
            return
        }
        const formData = {
            "USER_EMAIL": USER_EMAIL["USER_EMAIL"],
            "USER_PW": USER_PW["USER_PW"]
        }
        fetch('http://localhost:8000/signin/nuru', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }).then(res=>res.json()).then(jsonformat=>{
            console.log(jsonformat['token']);
            
        });
    }

    return (
        <div className="nuruLogin">
            <div className="loginForm">
                <input
                    className="emailInput"
                    type="text"
                    placeholder="사용자 이메일"
                    onChange={checkEmail}
                />
                <input
                    className="pwInput"
                    type="text"
                    placeholder="비밀번호"
                    onChange={checkPassword}
                />
                <button
                    className="loginButton"
                    type="button"
                    onClick= {submitInfo}>
                </button>

            </div>
         </div>
    );
}

export default Nuru