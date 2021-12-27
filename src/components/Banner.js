import React from "react";

const Banner = () => (
    <div className={"banner"}>
        <div><img src="./assets/img/logo.png" alt=""/></div>
        <div className={"title"}>一套基于TP6.0以及Vue2.0的后台管理系统</div>
        <div className={"desc"}>权限管理、数据列表、网站配置、微信集成、用户管理等基础功能一应具备</div>
        <div className={"link"}>
            <div className={"link-item"}>GitHub</div>
            <div className={"link-item"}>文档</div>
        </div>
    </div>
)

export default Banner