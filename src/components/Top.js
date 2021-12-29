import React, {createRef, useState} from "react";
import {Link} from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import http from "../services/http";
import util from "../util/util";

const Top = () => {
    const [showRegister, setShowRegister] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [registerForm, setRegisterForm] = useState({
        email:"",
        password:"",
        repassword: "",
        captcha: ""
    })

    const ref = createRef();

    const setForm = (event) => {
        util.setForm(event, setRegisterForm)
    }

    const register = () => {
        let data = new FormData(ref.current);
        http.$('register', data)
    }

    const handleClose = () => {
        setShowRegister(false);
        setShowLogin(false);
    }

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

        <Modal show={showRegister}>
            <Modal.Header closeButton>
                <Modal.Title>注册</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form ref={ref} onChange={setForm}>
                    <Form.Group>
                        <Form.Label>邮箱地址</Form.Label>
                        <Form.Control name="email" type="email" placeholder="请输入你的邮箱" defaultValue={registerForm.email} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>密码</Form.Label>
                        <Form.Control name="password" type="password" placeholder="请输入你的密码" defaultValue={registerForm.password} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>重复密码</Form.Label>
                        <Form.Control name="repassword" type="password" placeholder="请重复密码" defaultValue={registerForm.repassword} />
                    </Form.Group>

                    <InputGroup className="captcha mb-3">
                        <Form.Label>验证码</Form.Label>
                        <Form.Control name="code" placeholder="请输入验证码" defaultValue={registerForm.captcha} />
                        <InputGroup.Append>
                            <Button variant="outline-secondary">点击发送验证码</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    取消
                </Button>
                <Button variant="primary" onClick={register}>
                    注册
                </Button>
            </Modal.Footer>
        </Modal>

    </div>
};

export default Top;