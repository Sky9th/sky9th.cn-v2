import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import App from './pages/home/App';
import Chat from "./pages/chat/Chat";
import Loading from "./components/Loading";
import store from "./services/store/store";
import { Provider } from 'react-redux';
import Notice from "./components/Notice";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Routes>
                <Route element={<App/>} path="/"/>
                <Route element={<Chat/>} path="/chat"/>
            </Routes>
            <Loading />
            <Notice/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
