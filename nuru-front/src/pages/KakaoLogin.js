import React from 'react';
import { authURL } from './OAuth';
import queryString from 'query-string';
import axios from 'axios';

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
            <a href={authURL}>
                카카오톡id로 로그인
            </a>
        </>
        
    );
}


export default KakaoLogin