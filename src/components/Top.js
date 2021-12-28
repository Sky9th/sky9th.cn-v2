import React from "react";
import {Link} from "react-router-dom";

const top = () => {
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
                <div className={"menu-item disabled"}>登录</div>
                <div className={"menu-item disabled"}>注册</div>
            </div>
        </div>
    </div>
};

export default top