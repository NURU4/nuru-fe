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
            cookies.set('token', '', -1)
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

    
    
    