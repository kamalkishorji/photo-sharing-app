import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, compose , createStore} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { reducers } from './reducers';
import App from './App';

const store = createStore(reducers, compose(applyMiddleware(thunk)));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
     <Provider store={store}>
         <BrowserRouter>
         <App/>
         </BrowserRouter>
    </Provider>
    </React.StrictMode>
     );

reportWebVitals();
