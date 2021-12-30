import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import util from "../util/util";
import http from "../services/http";
import { Formik  } from 'formik';
import * as Yup from 'yup';

const Sign = (props) => {

    const getVerify = () => {
        // http.$('verify', {mail: formik.values.email}).then((data) => {
        //     console.log(data)
        // })
    }

    const handleClose = () => {
        props.setShowRegister(false);
        props.setShowLogin(false);
    }

    const SignUpSchema = Yup.object({
        mail: Yup.string().max(50, '最长50个字符'),
        password: Yup.string().max(50, '最长50个字符').required('请填写'),
        repassword: Yup.string().oneOf([Yup.ref('password'), null], '两次密码不一致').required('请填写'),
        code: Yup.string().required('请填写')
    });

    const test = () => {
        console.log(test)
    }

    return (
        <Modal show={props.showRegister}  onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>注册</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        mail:"",
                        password:"",
                        repassword: "",
                        code: ""
                    }}
                    validationSchema={SignUpSchema}
                    onSubmit={(values) => {
                        console.log(values);
                        http.$('register', values);
                        return false;
                    }}
                    validateForm={() => {
                        console.log(111)
                    }}>
                    {props => (
                        <Form onSubmit={props.handleSubmit}>
                            <Form.Group>
                                <Form.Label>邮箱地址</Form.Label>
                                <Form.Control name="mail" placeholder="请输入你的邮箱" />
                                <div>{props.errors.mail}</div>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>密码</Form.Label>
                                <Form.Control name="password" type="password" placeholder="请输入你的密码" defaultValue={props.values.password} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>重复密码</Form.Label>
                                <Form.Control name="repassword" type="password" placeholder="请重复密码" defaultValue={props.values.repassword} />
                            </Form.Group>

                            <InputGroup className="captcha mb-3">
                                <Form.Label>验证码</Form.Label>
                                <Form.Control name="code" placeholder="请输入验证码" defaultValue={props.values.code} />
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={getVerify}>点击发送验证码</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    取消
                </Button>
                <Button variant="primary">
                    注册
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Sign;