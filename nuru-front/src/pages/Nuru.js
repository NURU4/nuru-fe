import React from 'react';
import {withRouter, Redirect} from "react-router-dom";

//login-nuru

class Nuru extends React.Component {
    constructor(){
        super();
        this.state = {
            USER_EMAIL : "",
            USER_PW : "",
            email_vaild : false,
            pw_vaild: false,
        };
    }

    checkEmail = (event) => {
        this.setState({ USER_EMAIL : event.target.value });
        if (event.target.value.includes("@")) { //check value is e-mail or not
            this.setState({email_vaild : true});
        }
    };

    checkPassword = (event) => {
        this.setState({ USER_PW : event.target.value });
        if (event.target.value.length >= 6){ // check password length
            this.setState({pw_vaild : true});
        }
    }

    btnClick = () => {
        console.log("이메일", this.state.USER_EMAIL);
        console.log("비밀번호", this.state.USER_PW);
    }

    render() {
        return (
            <div className="nuruLogin">
                <div className="loginForm">
                    <input
                        className="emailInput"
                        type="text"
                        placeholder="사용자 이메일"
                        onChange={this.checkEmail}
                    />
                    <input
                        className="pwInput"
                        type="text"
                        placeholder="비밀번호"
                        onChange={this.checkPassword}
                    />
                    <button
                        className="loginButton"
                        type="button"
                        onClick={this.btnClick}>
                        로그인
                    </button>

                </div>
            </div>
        )
    }
    
}

export default Nuru;