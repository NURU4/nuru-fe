import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css'

function Login() {
    return (
      <>
      <div className="Logo">
        <span>
          
        </span>
      </div>
      <div className="buttons">
        <div>
          <Link to="/login/kakao">
            <button className="kakaoButton">
              <span className="kakaoButtonText">카카오톡으로 로그인</span>
            </button>
          </Link>
        </div>
        <div>
          <Link to="/login/nuru">
            <button className="nuruButton">
              <span className="nuruButtonText">NURU 로그인</span>
            </button>
          </Link>
        </div>
        <div>
          <Link to="/game/guest">
            <button className="guestButton">
              <span className="guestButtonText">로그인 없이 시작하기</span>
            </button>
          </Link>
        </div>
      </div>
      </>
    );
  }

export default Login;