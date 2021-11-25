import React from 'react';
import { authURL } from './OAuth';
import queryString from 'query-string';
import axios from 'axios';
import logo from './static/kakao_login_medium_narrow.png'
const KakaoLogin = () => {
    const query = queryString.parse(window.location.search);
    console.log(query)
    React.useEffect(() => {  
        if (query.code) {
            //redirect로 넘어온 route에 파라미터 code값이 있는 경우, 토큰 발급(초기)
            kakaoTokenHandler(query.code.toString());
        }
        
    }, []);
    const kakaoTokenHandler = async (code) => {
        const data = {
            grant_type: "authorization_code",
            client_id: "c38ee04e16631dabbb8e43a1ed540d05",
            redirectURI: "http://localhost:3000/oauth/callback/kakao-login",
            code: code
        };
        const queryString = Object.keys(data)
            .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
            .join('&');
        
            //토큰 발급

        axios.post('https://kauth.kakao.com/oauth/token', queryString, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
        }).then((res) => {
            console.log(res)
        }); 
    }
    return (
        <>
        <div>
            <a href={authURL} style={{position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)", fontSize: "20px"}}>
                <img src={logo} alt="logo" ></img>
            </a>
        </div>
            
        </>
        
    );
}


export default KakaoLogin