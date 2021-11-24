import React from 'react'
import { useDispatch } from "react-redux";
import KakaoAuth from './KakaoAuth';

const RedirectHandler = (props) => {
  const dispatch = useDispatch();
  // 인가코드 받아오기
  let code = new URL(window.location.href).searchParams.get("code");

  React.useEffect(()=>{
    async function fetchData() {
      await dispatch(KakaoAuth(code));
    }
    fetchData();
  }, []);

  return <div>loading..</div>;
};

export default RedirectHandler ;
