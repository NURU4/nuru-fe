import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//import { kakao_login_URL } from "./OAuth";
import Login from './pages/Login.js';
import Nuru from './pages/Nuru.js';

class App extends React.Component{
  state = {
    temp : "https://kauth.kakao.com/oauth/authorize?client_id={REST_API_KEY}&redirect_uri={REDIRECT_URI}&response_type=code",
    redirect_URI : "/oauth/callback/kakao-login"
  };
//<Login/>
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/login/nuru" component={Nuru}></Route>
          <Route exact path="/login/kakao" ></Route>
        </Switch>
      </BrowserRouter>
    );  
  }
}

export default App;