import React from 'react';
import { BrowserRouter, Route, Switch,withRouter } from 'react-router-dom';
import KakaoAuth from './pages/KakaoAuth.js';
import KakaoLogin from './pages/KakaoLogin.js';
import Login from './pages/Login.js';
import Nuru from './pages/Nuru.js';
import Cookies from 'universal-cookie';
import ImageUpload from './pages/ImageUpload.js';
import ImageConfirm from './pages/ImageConfirm.js';

function App() {
  const cookies = new Cookies();
  cookies.set('token', 'emptyToken', {
    path: '/',
    expires: Math.floor(Date.now / 1000) + 7200
  })
  cookies.set('gameImage', 'emptyURL', {
    path: '/',
    expires: Math.floor(Date.now / 1000) + 7200
  })
  return(
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}><Login/></Route>
          <Route exact path="/login/nuru" component={Nuru}></Route>
          <Route exact path="/login/kakao" component={KakaoLogin}></Route>
          <Route exact path="/oauth/callback/kakao-login" component={KakaoAuth}></Route>
          <Route exact path="/game/image-upload" component={ImageUpload}></Route>
          <Route exact path="/game/image-upload/confirm" component={ImageConfirm}></Route>

        </Switch>
      </BrowserRouter>
    );
}

export default App;