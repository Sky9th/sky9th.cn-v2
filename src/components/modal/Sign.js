import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import http from "../../services/http";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Alert from "react-bootstrap/Alert";
import {useDispatch, useSelector} from "react-redux";
import util from "../../util/util";

const SignModal = (props) => {

    const handleClose = () => {
        util.modal.hide(dispatch, 'forgot')
        util.modal.hide(dispatch, 'login')
        util.modal.hide(dispatch, 'register')
    }

    let sendInterval = false;
    const [sendMsg, setSendMsg] = useState("点击发送验证码")
    const [captcha, setCaptcha] = useState("")
    const fingerprint = useSelector(state => state.profile.fingerprint)
    const exShowRegister = useSelector(state => state.modal.showRegister)
    const exShowLogin = useSelector(state => state.modal.showLogin)
    const exShowForgot = useSelector(state => state.modal.showForgot)
    const dispatch = useDispatch()

    const getVerifyCode = () => {
        http.$('verify', {mail: registerFormik.values.mail ? registerFormik.values.mail : forgotFormik.values.mail}).then((data) => {
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

    const handleReset = () => {
        handleClose()
        setTimeout(() => {
            util.modal.show(dispatch, 'forgot')
        },300)
    }

    useEffect(() => {
        forgotFormik.resetForm()
        registerFormik.resetForm()
        loginFormik.resetForm()
    },[exShowRegister, exShowForgot, exShowLogin])

    useEffect(() => {
        const getCaptcha = () => {
            http.$('captcha', {fingerprint: fingerprint}).then((data) => {
                setCaptcha(data.data)
            })
        }
        if(exShowLogin) getCaptcha();
    }, [exShowLogin, fingerprint])

    const initialValues = {
        mail: '',
        password: '',
        repassword: '',
        code: '',
    }

    const validationSchema = Yup.object({
        mail: Yup.string().email('请输入正确的邮箱').max(50, '最长50个字符').required('请填写此字段'),
        password: Yup.string().min(6,'最少6个字符').max(50, '最长50个字符').required('请填写此字段'),
        repassword: Yup.string().oneOf([Yup.ref('password'), null], '两次密码不一致').required('请填写'),
        code: Yup.string().required('请填写')
    })

    const registerFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            http.$('register', values).then((data) => {
                dispatch({type:'profile/setSessionKey', payload: data.data.sessionKey})
                dispatch({type:'profile/setUserInfo', payload: {mail:data.data.mail}})
                handleClose()
            })
        },
    });

    const forgotFormik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: values => {
            http.$('setPassword', values).then((data) => {
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
        validationSchema: Yup.object().shape({
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
            <InfoForm formik={registerFormik} getVerifyCode={getVerifyCode} sendMsg={sendMsg} title={"注册"} handleClose={handleClose} showModal={exShowRegister} />
            <InfoForm formik={forgotFormik} getVerifyCode={getVerifyCode} sendMsg={sendMsg} title={"重置密码"} handleClose={handleClose} showModal={exShowForgot} />

            <Modal show={exShowLogin} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>登录</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate onSubmit={loginFormik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>邮箱地址</Form.Label>
                            <Form.Control
                                placeholder="请输入你的邮箱"
                                {...util.form.getFieldProps(loginFormik, 'mail')}
                            />
                            {util.form.isTouchAndError(loginFormik, 'mail') && <Alert variant={"danger"}>{loginFormik.errors.mail}</Alert>}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="请输入你的密码"
                                {...util.form.getFieldProps(loginFormik, 'password')}
                            />
                            {util.form.isTouchAndError(loginFormik, 'password') && <Alert variant={"danger"}>{loginFormik.errors.password}</Alert>}
                        </Form.Group>

                        <InputGroup className="captcha mb-3">
                            <Form.Label>验证码</Form.Label>
                            <Form.Control
                                placeholder="请输入验证码"
                                {...util.form.getFieldProps(loginFormik, 'code')}
                            />
                            <InputGroup.Append>
                                <div className={"captcha-img"} onClick={getCaptcha}><img src={captcha} alt=""/></div>
                            </InputGroup.Append>
                            {util.form.isTouchAndError(loginFormik, 'code') && <Alert variant={"danger"}>{loginFormik.errors.code}</Alert>}
                        </InputGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleReset}>
                        重置
                    </Button>
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

const InfoForm = (props) => {
    const {formik, getVerifyCode, sendMsg, title, handleClose, showModal} = props
    return (

        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate onSubmit={formik.handleSubmit} >
                    <Form.Group>
                        <Form.Label>邮箱地址</Form.Label>
                        <Form.Control
                            placeholder="请输入你的邮箱"
                            {...util.form.getFieldProps(formik, 'mail')}
                        />
                        {util.form.isTouchAndError(formik, 'mail') && <Alert variant={"danger"}>{formik.errors.mail}</Alert>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>密码</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="请输入你的密码"
                            {...util.form.getFieldProps(formik, 'password')}
                        />
                        {util.form.isTouchAndError(formik, 'password') && <Alert variant={"danger"}>{formik.errors.password}</Alert>}
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>重复密码</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="请重复密码"
                            {...util.form.getFieldProps(formik, 'repassword')}
                        />
                        {util.form.isTouchAndError(formik, 'repassword') && <Alert variant={"danger"}>{formik.errors.repassword}</Alert>}
                    </Form.Group>

                    <InputGroup className="captcha mb-3">
                        <Form.Label>验证码</Form.Label>
                        <Form.Control
                            placeholder="请输入验证码"
                            {...util.form.getFieldProps(formik, 'code')}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={getVerifyCode} disabled={sendMsg !== "点击发送验证码"} >{sendMsg}</Button>
                        </InputGroup.Append>
                        {util.form.isTouchAndError(formik, 'code') && <Alert variant={"danger"}>{formik.errors.code}</Alert>}
                    </InputGroup>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    取消
                </Button>
                <Button variant="primary" onClick={formik.handleSubmit}>
                    提交
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignModal;