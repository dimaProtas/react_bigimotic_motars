import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Redux/redux-store.js';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';



const root = ReactDOM.createRoot(document.getElementById('root'));
export const rerenderEntireTree = (state) => {
  root.render(

      <React.StrictMode>
          <BrowserRouter>
              <Provider store={store}>
                  <App state={state} />
              </Provider>
          </BrowserRouter>
      </React.StrictMode>
  );
}

rerenderEntireTree(store.getState());



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
