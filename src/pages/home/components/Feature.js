import React from "react";

const Feature = () => (
    <div className={"feature"}>
        <div className={"feature-title"}>
            <h3>基础功能</h3>
            <span>Basic Feature</span>
        </div>
        <div className={"feature-item-list"}>
            <div className={"feature-item"}>
                <div className={"icon"}><i className={"bi bi-ui-checks-grid"}></i></div>
                <div className={"title"}>权限管理</div>
                <div className={"desc"}>具备基本的权限组，角色组的后台权限管理节点功能</div>
            </div>
            <div className={"feature-item"}>
                <div className={"icon"}><i className={"bi bi-table"}></i></div>
                <div className={"title"}>数据表单</div>
                <div className={"desc"}>快速定制数据表格、数据表单，易于维护</div>
            </div>
            <div className={"feature-item"}>
                <div className={"icon"}><i className={"bi bi-people-fill"}></i></div>
                <div className={"title"}>用户管理</div>
                <div className={"desc"}>用户注册、登陆、分组、禁用等基本用户管理功能</div>
            </div>
            <div className={"feature-item"}>
                <div className={"icon"}><i className={"bi bi-chat-fill"}></i></div>
                <div className={"title"}>微信集成</div>
                <div className={"desc"}>基于EasyWechatSDK的微信基础接口的集成对接</div>
            </div>
        </div>
    </div>
)

export default Feature;