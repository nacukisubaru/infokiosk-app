import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { rootReducer } from './redux/reducers/rootReducer';

import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/index.css';
import "@fancyapps/ui/dist/fancybox.css";

let initialState = {};

const store = createStore(rootReducer, initialState, composeWithDevTools(
  applyMiddleware(
    thunk
  ),
));

const root = document.getElementById('root');

render(
  <BrowserRouter>
    <Provider store={ store }>         
      <App />
    </Provider>
  </BrowserRouter>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
