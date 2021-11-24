import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = false;
ReactDOM.render(<App/>, document.getElementById('root')      
);

