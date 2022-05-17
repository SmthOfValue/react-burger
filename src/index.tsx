import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import App from './components/App/App.jsx';



ReactDOM.render(
  <React.StrictMode>
    <App></App>
    
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

