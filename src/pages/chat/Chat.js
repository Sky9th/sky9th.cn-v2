import React, {useEffect, useState} from "react";
import './Chat.scss'

import {Row, Col} from "react-bootstrap";

import Room from "./components/Room";
import Top from "../../components/Top";
import People from "./components/People";
import Tag from "./components/Tag";
import http from "../../services/http";
import {useDispatch, useSelector} from "react-redux";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import Socket from "../../services/socket"

const Chat = () => {

    const [tagList, setTagList] = useState([])
    const [showNickModal, setShowNickModal] = useState(false)
    const userInfo = useSelector(state => state.profile.userInfo);
    const dispatch = useDispatch()

    useEffect(() => {
        getTag();
    }, [])

    useEffect(() => {
        if (!userInfo.nickname) {
            setShowNickModal(true)
        } else {
            setShowNickModal(false)
        }
    }, [userInfo])

    const getTag = () => {
        http.$('chat/tag').then((data) => {
            setTagList(data.data)
        })
    }

    const formik = useFormik({
        initialValues: {
            nickname: '',
        },
        validationSchema: Yup.object({
            nickname: Yup.string().min(5,'最少5个字符').max(50, '最长50个字符').required('请填写此字段'),
        }),
        onSubmit: values => {
            http.$('setNickname', values).then(() => {
                dispatch({type:"profile/setUserInfo", payload:{nickname: values.nickname}})
                setShowNickModal(false)
            })
        },
    });

    const handleClose = () => {
        setShowNickModal(false)
    }

    return (
        <div>
            <div className={"chat"}>
                <Top/>
            </div>
            
            <Row noGutters={true}>
                <Col lg={9}>
                    <Room tagList={tagList}></Room>
                </Col>
                <Col>
                    <People></People>
                    <Tag tagList={tagList}></Tag>
                </Col>
            </Row>

            <Modal show={showNickModal} onHide={handleClose}>
                <Modal.Body>
                    <Form noValidate onSubmit={formik.handleSubmit}>
                        <Form.Group>
                            <Form.Label>昵称</Form.Label>
                            <Form.Control
                                placeholder="请输入你的昵称"
                                {...formik.getFieldProps('nickname')}
                                isValid={formik.touched.nickname && !formik.errors.nickname}
                                isInvalid={!!formik.errors.nickname}
                            />
                            {formik.errors.nickname && <Alert variant={"danger"}>{formik.errors.nickname}</Alert>}
                        </Form.Group>
                        <Button varinat={"primary"} type={"submit"}>提交</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Chat;