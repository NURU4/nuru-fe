import React, { useState } from 'react';
import queryString from 'query-string';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router';

const KakaoAuth = (setCookie) => {
    const history = useHistory();
    const cookies = new Cookies();
    const query = queryString.parse(window.location.search);
    React.useEffect(() => {  
        if (query.code) {
            //redirect로 넘어온 URL에서 코드 값 가져오기
            kakaoTokenHandler(query.code.toString())
        }
    }, []); //컴포넌트가 처음 마운트 시에 query code찾기

    const kakaoTokenHandler = (uri_code) => {

        const data = {
            "USER_KAKAO_CODE": uri_code
        };
        axios.post('/signin/kakao', data, {
            headers: {
            "Content-Type": 'application/json',
        }})
        .then(res=>res['data'])
        .then(data=>data['token'])
        .then(token=>{
            cookies.set('token', token);
            console.log(cookies.get('token'));
            history.push('/game/image-upload');
        })
    };
    return <div style={{position:"absolute", left:"50%", top:"50%", transform: "translate(-50%, -50%)", fontSize: "20px"}}>
        로그인 중입니다. 잠시만 기다려 주세요
    </div>;
}

export default KakaoAuth
        /*
        fetch('http://localhost:8000/signin/social', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then(res=>{console.log(res)});
        */
       /*
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
        })
        .then(res => {
            console.log(res['data']);})
        /*
        .then(data=>{
            axios.get('http://localhost:8000/social/signin', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': data['access_token']//'randomtokenfromoauth'
                }
            }).then(a=>{
                    if (a.status === 200){
                        data = a.json()
                        setToken(data['USER_TOKEN']);
                    }
                    else{
                        console.log("error");
                    }
                })
*/

    
    
    