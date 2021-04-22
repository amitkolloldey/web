import React from 'react'
import ReactDOM from 'react-dom'
import './includes/bootstrap'
import './index.css'
import App from './App'
import {HashRouter, Router} from "react-router-dom"
import {Provider} from "react-redux";
import {configureStore} from "./redux/configureStore";
import '@fortawesome/fontawesome-free/js/all'
import history from './history';

const store = configureStore()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <App/>
            </HashRouter >
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

