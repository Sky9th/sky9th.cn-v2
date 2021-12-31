import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Sign from "./Sign";
import {useDispatch, useSelector} from "react-redux";
import http from "../services/http";

const Top = () => {

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const profile = useSelector(state => state.profile.userInfo)
    const sessionKey = useSelector(state => state.profile.sessionKey)
    const dispatch = useDispatch();

    const logout = () => {
        dispatch({type:'profile/logout'})
    }

    useEffect(() => {
        console.log(sessionKey)
        if (sessionKey) {
            http.$('userInfo').then((data) => {
                dispatch({type:'profile/setUserInfo', payload: data.data})
            })
        }
    }, [sessionKey])

    return <div className={"header"}>
        <div className={"logo"}>
            <img src="./assets/img/logo_small.png" alt=""/>
        </div>
        <div className={"menu"}>
            <div className={"menu-item"}><Link to={"/"}>首页</Link></div>
            <div className={"menu-item"}><a href={"https://github.com/Sky9th/sky-admin-vue"}>Github</a></div>
            <div className={"menu-item"}><a href={"http://admin.sky9th.cn"}>示例</a></div>
            <div className={"menu-item disabled"}>文档</div>
            <div className={"menu-item"}><Link to={"/chat"}>讨论</Link></div>
        </div>
        <div className={"profile"}>
            { profile.mail && <div className={"userInfo"}>
                <i className="bi bi-person-circle"></i>
                <span>{profile.mail}</span>
                <i className="bi bi-box-arrow-left logout" onClick={logout}></i>
            </div>}
            { !profile.mail && <div className={"profile-menu"}>
                <div className={"menu-item"} onClick={() => setShowLogin(true)}>登录</div>
                <div className={"menu-item"} onClick={() => setShowRegister(true)}>注册</div>
            </div>}
        </div>

        <Sign showRegister={showRegister} showLogin={showLogin} setShowRegister={setShowRegister} setShowLogin={setShowLogin} />

    </div>
};

export default Top;