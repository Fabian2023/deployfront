import React from 'react';
// import ReactDOM from 'react-dom/client';
import { hydrate } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';



import { Provider } from "react-redux";
import {store} from "./redux/store/store"


// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
document.addEventListener('DOMContentLoaded', () => {
hydrate(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
document.getElementById('root')
) });
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();