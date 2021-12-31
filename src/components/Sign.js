import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import http from "../services/http";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Alert from "react-bootstrap/Alert";
import {useDispatch, useSelector} from "react-redux";

const Sign = (props) => {

    const handleClose = () => {
        props.setShowRegister(false);
        props.setShowLogin(false);
    }

    let sendInterval = false;
    const [sendMsg, setSendMsg] = useState("点击发送验证码")
    const [captcha, setCaptcha] = useState("")
    const fingerprint = useSelector(state => state.profile.fingerprint)
    const dispatch = useDispatch()

    const getVerifyCode = () => {
        http.$('verify', {mail: registerFormik.values.mail}).then((data) => {
            if (data.code === 0) {
                let time = 60
                sendInterval = setInterval(() => {
                    setSendMsg(time + '秒')
                    time -- ;
                    if (time <= 0 ){
                        clearInterval(sendInterval)
                        setSendMsg("点击发送验证码")
                    }
                },1000)
            }
        })
    }

    const getCaptcha = () => {
        http.$('captcha', {fingerprint: fingerprint}).then((data) => {
            setCaptcha(data.data)
        })
    }

    useEffect(() => {
        const getCaptcha = () => {
            http.$('captcha', {fingerprint: fingerprint}).then((data) => {
                setCaptcha(data.data)
            })
        }
        if(props.showLogin) getCaptcha();
    }, [props.showLogin, fingerprint])

    const registerFormik = useFormik({
        initialValues: {
            mail: '',
            password: '',
            repassword: '',
            code: '',
        },
        validationSchema: Yup.object({
            mail: Yup.string().email('请输入正确的邮箱').max(50, '最长50个字符').required('请填写此字段'),
            password: Yup.string().min(6,'最少6个字符').max(50, '最长50个字符').required('请填写此字段'),
            repassword: Yup.string().oneOf([Yup.ref('password'), null], '两次密码不一致').required('请填写'),
            code: Yup.string().required('请填写')
        }),
        onSubmit: values => {
            http.$('register', values).then((data) => {
                dispatch({type:'profile/setSessionKey', payload: data.data.sessionKey})
                dispatch({type:'profile/setUserInfo', payload: {mail:data.data.mail}})
                handleClose()
            })
        },
    });

    const loginFormik = useFormik({
        initialValues: {
            mail: '',
            password: '',
            code: ''
        },
        validationSchema: Yup.object({
            mail: Yup.string().email('请输入正确的邮箱').max(50, '最长50个字符').required('请填写此字段'),
            password: Yup.string().min(6,'最少6个字符').max(50, '最长50个字符').required('请填写此字段'),
            code: Yup.string().required('请填写')
        }),
        onSubmit: values => {
            values.fingerprint = fingerprint;
            http.$('login', values).then((data) => {
                dispatch({type:'profile/setSessionKey', payload: data.data.sessionKey})
                dispatch({type:'profile/setUserInfo', payload: {mail:data.data.mail}})
                handleClose()
                loginFormik.resetForm()
            }).catch(() => {
                getCaptcha()
            })
        },
    });

    return (
        <div>
            <Modal show={props.showRegister} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>注册</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate onSubmit={registerFormik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>邮箱地址</Form.Label>
                            <Form.Control
                                placeholder="请输入你的邮箱"
                                {...registerFormik.getFieldProps('mail')}
                                isValid={registerFormik.touched.mail && !registerFormik.errors.mail}
                                isInvalid={!!registerFormik.errors.mail}
                            />
                            {registerFormik.errors.mail && <Alert variant={"danger"}>{registerFormik.errors.mail}</Alert>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="请输入你的密码"
                                {...registerFormik.getFieldProps('password')}
                                isValid={registerFormik.touched.password && !registerFormik.errors.password}
                                isInvalid={!!registerFormik.errors.password}
                            />
                            {registerFormik.errors.password && <Alert variant={"danger"}>{registerFormik.errors.password}</Alert>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>重复密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="请重复密码"
                                {...registerFormik.getFieldProps('repassword')}
                                isValid={registerFormik.touched.repassword && !registerFormik.errors.repassword}
                                isInvalid={!!registerFormik.errors.repassword}
                            />
                            {registerFormik.errors.repassword && <Alert variant={"danger"}>{registerFormik.errors.repassword}</Alert>}
                        </Form.Group>

                        <InputGroup className="captcha mb-3">
                            <Form.Label>验证码</Form.Label>
                            <Form.Control
                                placeholder="请输入验证码"
                                {...registerFormik.getFieldProps('code')}
                                isValid={registerFormik.touched.code && !registerFormik.errors.code}
                                isInvalid={!!registerFormik.errors.code}
                            />
                            <InputGroup.Append>
                                <Button variant="outline-secondary" onClick={getVerifyCode} disabled={sendMsg !== "点击发送验证码"} >{sendMsg}</Button>
                            </InputGroup.Append>
                            {registerFormik.errors.code && <Alert variant={"danger"}>{registerFormik.errors.code}</Alert>}
                        </InputGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" onClick={registerFormik.handleSubmit}>
                        注册
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={props.showLogin} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>注册</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate onSubmit={loginFormik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>邮箱地址</Form.Label>
                            <Form.Control
                                placeholder="请输入你的邮箱"
                                {...loginFormik.getFieldProps('mail')}
                                isValid={loginFormik.touched.mail && !loginFormik.errors.mail}
                                isInvalid={!!loginFormik.errors.mail}
                            />
                            {loginFormik.errors.mail && <Alert variant={"danger"}>{loginFormik.errors.mail}</Alert>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="请输入你的密码"
                                {...loginFormik.getFieldProps('password')}
                                isValid={loginFormik.touched.password && !loginFormik.errors.password}
                                isInvalid={!!loginFormik.errors.password}
                            />
                            {loginFormik.errors.password && <Alert variant={"danger"}>{loginFormik.errors.password}</Alert>}
                        </Form.Group>

                        <InputGroup className="captcha mb-3">
                            <Form.Label>验证码</Form.Label>
                            <Form.Control
                                placeholder="请输入验证码"
                                {...loginFormik.getFieldProps('code')}
                                isValid={loginFormik.touched.code && !loginFormik.errors.code}
                                isInvalid={!!loginFormik.errors.code}
                            />
                            <InputGroup.Append>
                                <div className={"captcha-img"} onClick={getCaptcha}><img src={captcha} alt=""/></div>
                            </InputGroup.Append>
                            {loginFormik.errors.code && <Alert variant={"danger"}>{loginFormik.errors.code}</Alert>}
                        </InputGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        取消
                    </Button>
                    <Button variant="primary" onClick={loginFormik.handleSubmit}>
                        登录
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Sign;