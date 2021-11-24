import React from 'react';
import { BrowserRouter, Route, Switch,withRouter } from 'react-router-dom';
import KakaoAuth from './pages/KakaoAuth.js';
import KakaoLogin from './pages/KakaoLogin.js';
import Login from './pages/Login.js';
import Nuru from './pages/Nuru.js';
import Cookies from 'universal-cookie';

function App() {
  const cookies = new Cookies();
  cookies.set('token', 'emptyToken',{
    path: '/',
    expires: Math.floor(Date.now / 1000) + 7200
  })
  return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}><Login/></Route>
          <Route exact path="/login/nuru" component={Nuru}></Route>
          <Route exact path="/login/kakao"component={KakaoLogin}></Route>
          <Route exact path="/login/kakao"component={KakaoLogin}></Route>
          <Route exact path="/oauth/callback/kakao-login" component={KakaoAuth}></Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;