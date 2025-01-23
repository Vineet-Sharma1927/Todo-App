import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
    <Toaster/>
  </Provider>,
  document.getElementById('root')
);
