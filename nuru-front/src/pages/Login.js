import React from 'react';
import {Link} from 'react-router-dom';
import './Login.css'
import { withRouter } from 'react-router';


const Login = () => {
    return(
      <>
      <div className="Logo">
        <span className="maintext">
          NURU<br/>
        </span>
        <span className="description">
          다른그림찾기
        </span>
      </div>
      <div className="buttons">
        <div>
          <Link to="/login/kakao">
            <button className="kakaoButton">
              <span className="buttonText">카카오톡으로 로그인</span>
            </button>
          </Link>
        </div>
        {/* <div>
          <Link to="/login/nuru">
            <button className="nuruButton">
              <span className="buttonText">NURU 로그인</span>
            </button>
          </Link>
        </div>
        <div>
          <Link to="/game/guest">
            <button className="guestButton">
              <span className="buttonText">로그인 없이 시작하기</span>
            </button>
          </Link>
        </div> */}
      </div>
      </>
    );
      
  }

export default Login