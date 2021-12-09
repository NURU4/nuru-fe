import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import App from './App';

// axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = "http://ec2-13-125-255-212.ap-northeast-2.compute.amazonaws.com:8000";   
const protocol = window.location.protocol;
axios.defaults.baseURL = "http://api.nuru.kr:8000";
if(protocol==="https:")axios.defaults.baseURL = "https://cors-everywhere.herokuapp.com/http://api.nuru.kr:8000"
// axios.defaults.withCredentials = true;
ReactDOM.render(
    <App/>,
    document.getElementById('root')      
);

