import React from "react";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

const Banner = () => (
    <div className={"banner"}>
        <div><img src="./assets/img/logo.png" alt=""/></div>
        <div className={"title"}>一套基于TP6.0以及Vue2.0的后台管理系统</div>
        <div className={"desc"}>权限管理、数据列表、网站配置、微信集成、用户管理等基础功能一应具备</div>
        <div className={"link"}>
            <Button className={"link-item"}><a href="https://github.com/Sky9th/sky-admin-vue">GitHub</a></Button>
            <Button className={"link-item"} disabled>文档</Button>
        </div>
    </div>
)

export default Banner