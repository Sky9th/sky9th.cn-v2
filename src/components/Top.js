import React from "react";

const top = () => {
    return <div className={"header"}>
        <div className={"logo"}>
            <img src="./assets/img/logo_small.png" alt=""/>
        </div>
        <div className={"menu"}>
            <div className={"menu-item"}>首页</div>
            <div className={"menu-item"}>Github</div>
            <div className={"menu-item"}>文档</div>
            <div className={"menu-item"}>讨论</div>
        </div>
        <div className={"profile"}>
            <div className={"profile-menu"}>
                <div className={"menu-item"}>登录</div>
                <div className={"menu-item"}>注册</div>
            </div>
        </div>
    </div>
};

export default top