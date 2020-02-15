import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
import { AppProvider } from './context/AppContext';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers';

let store = createStore(reducers/*,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()*/);

ReactDOM.render(
    <Provider store={store}>
        <AppProvider>
            <App />
        </AppProvider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
