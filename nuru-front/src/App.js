import React from 'react';
import { BrowserRouter, Route, Switch,withRouter } from 'react-router-dom';
import Initpage from './pages/Initpage.js';
import KakaoAuth from './pages/KakaoAuth.js';
import KakaoLogin from './pages/KakaoLogin.js';
//import { kakao_login_URL } from "./OAuth";
import Login from './pages/Login.js';
import Nuru from './pages/Nuru.js';

function App() {

  return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}><Login/></Route>
          <Route exact path="/login/nuru" component={Nuru}></Route>
          <Route exact path="/login/kakao" component={KakaoLogin}></Route>
          <Route exact path="/oauth/callback/kakao-login" component={KakaoAuth}></Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;