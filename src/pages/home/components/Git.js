import React from "react";

const Git = () => {

    return (
        <div className={"git"}>
            <div className={"git-item"}>
                <div className={"git-img"}><i className={"bi bi-tv"}></i></div>
                <div className={"git-content"}>
                    <div className={"git-title"}>SkyAdmin Vue</div>
                    <div className={"git-desc"}>SkyAdmin是使用基于D2Admin开发的内容管理系统前端框架，使用vue-cli3构建，具备基本的后台管理功能，集成 element-UI, Fontawesome等多种常用库，助力敏捷开发</div>
                    <div className={"git-icon"}>
                        <img alt="GitHub issues" src="https://img.shields.io/github/issues/Sky9th/sky-admin-vue"></img>
                        <img alt="GitHub forks" src="https://img.shields.io/github/forks/Sky9th/sky-admin-vue"></img>
                        <img alt="GitHub stars" src="https://img.shields.io/github/stars/Sky9th/sky-admin-vue"></img>
                        <img alt="GitHub license" src="https://img.shields.io/github/license/Sky9th/sky-admin-vue"></img>
                    </div>
                </div>
            </div>

            <div className={"git-item"}>
                <div className={"git-img"}><i className={"bi bi-router-fill"}></i></div>
                <div className={"git-content"}>
                    <div className={"git-title"}>SkyAdmin API</div>
                    <div className={"git-desc"}>基于TP6.0+，PHP7.0+以及Mysql数据库的内容管理系统后端框架，配合SkyAdminVue使用，前后端分离让系统耦合度更低。具备角色权限，网站配置以及用户管理等基础功能，易于拓展</div>
                    <div className={"git-icon"}>
                        <img alt="GitHub issues" src="https://img.shields.io/github/issues/Sky9th/sky-admin-api"></img>
                        <img alt="GitHub forks" src="https://img.shields.io/github/forks/Sky9th/sky-admin-api"></img>
                        <img alt="GitHub stars" src="https://img.shields.io/github/stars/Sky9th/sky-admin-api"></img>
                        <img alt="GitHub license" src="https://img.shields.io/github/license/Sky9th/sky-admin-api"></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Git;