import React, {useState} from "react";
import {Link} from "react-router-dom";
import Sign from "./Sign";

const Top = () => {

    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

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
            <div className={"profile-menu"}>
                <div className={"menu-item"} onClick={() => setShowLogin(true)}>登录</div>
                <div className={"menu-item"} onClick={() => setShowRegister(true)}>注册</div>
            </div>
        </div>

        <Sign showRegister={showRegister} showLogin={showLogin} setShowRegister={setShowRegister} setShowLogin={setShowLogin} />

    </div>
};

export default Top;