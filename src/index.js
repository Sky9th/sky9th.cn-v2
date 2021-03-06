import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

import reportWebVitals from './reportWebVitals';
import {Routes, Route, HashRouter} from "react-router-dom";

import App from './pages/home/App';
import Chat from "./pages/chat/Chat";
import store from "./services/store/store";
import { Provider } from 'react-redux';
import Fingerprint2 from "fingerprintjs2";
import {setFingerprint, setSessionKey} from "./services/store/reducer/profileReducer";
import util from "./util/util";
import Modal from "./components/modal";

Fingerprint2.get({}, function (components) {
    let values = components.map(function (component) { return component.value })
    let murmur = Fingerprint2.x64hash128(values.join(''), 31)
    store.dispatch(setFingerprint(murmur))
})

const sessionKey = util.cookies.get('sessionKey');
if (sessionKey) {
    store.dispatch(setSessionKey(sessionKey));
}

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <Routes>
                <Route element={<App/>} path="/"/>
                <Route element={<Chat/>} path="/chat"/>
            </Routes>
            <Modal />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
