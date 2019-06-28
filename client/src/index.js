import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux'
import App from './components/App';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));



ReactDOM.render(
    <Provider store={store}> 
        <App />
    </Provider>   
    , document.querySelector('#root'));
