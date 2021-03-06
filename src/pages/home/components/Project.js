import React from "react";
import {Link} from "react-router-dom";

const Project = () => (
    <div className={"feature"}>
        <div className={"feature-title"}>
            <h3>相关项目</h3>
            <span>SEE WHAT'S NEW</span>
        </div>
        <div className={"feature-item-list"}>
            <div className={"feature-item hang-on"}>
                <div className={"img"} style={{background:'#ffbb38'}}>Sky<br />Mall</div>
                <div className={"desc"}>简约的B2C单用户商城</div>
            </div>
            <div className={"feature-item"}>
                <Link to={"/chat"}>
                    <div className={"img"} style={{background:'#24bbff'}}>Sky<br />Chat</div>
                    <div className={"desc"}>一起聊</div>
                </Link>
            </div>
            <div className={"feature-item hang-on"}>
                <div className={"img"} style={{background:'#00c52f'}}>2D<br />Chat</div>
                <div className={"desc"}>2D射箭聊天小游戏</div>
            </div>
        </div>
    </div>
)

export default Project;