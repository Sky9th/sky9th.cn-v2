import React, {useRef, useEffect, useState} from "react";
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
import {io} from "socket.io-client";
import util from "../../util/util";

const socket = io(process.env.REACT_APP_WS_HOST, {
    transports:['websocket'],
    auth: util.encrypt.getSignatureParam(),
    autoConnect: false
});

const Chat = () => {

    const [tagList, setTagList] = useState([])
    const [onlineList, setOnlineList] = useState([])
    const [joinUser, setJoinUser] = useState([])
    const [showNickModal, setShowNickModal] = useState(false)
    const userInfo = useSelector(state => state.profile.userInfo);
    const dispatch = useDispatch()
    const room = useRef(null)

    useEffect(() => {
        getTag();
        socket.on('connect', () => {
            console.log('-----connect------')
        })

        socket.on('authCb', (data) => {
            console.log('-----authCb------', data)
            setOnlineList(data.user)
        })

        socket.on('joinCb', (data) => {
            setJoinUser(data)
        })

        socket.on('leaveCb', (data) => {
            console.log('-----leaveCb------', data)
            delete onlineList[Object.keys(data)[0]]
            setOnlineList(onlineList)
        })

        socket.on('toAllCb', (data) => {
            console.log('-----toAllCb------', data)
            room.current.listItem.push(data)
            let _listItem = [].concat(room.current.listItem)
            console.log(_listItem)
            room.current.setListItem(_listItem)
        })

        return () => {
            socket.off('connect')
            socket.off('authCb')
            socket.off('joinCb')
            socket.off('leaveCb')
            socket.close()
        }
    }, [])

    useEffect(() => {
        if (!userInfo.nickname) {
            if(Object.keys(userInfo).length > 0) setShowNickModal(true)
        } else {
            socket.connect()
            console.log(2222222222)
            setShowNickModal(false)
        }
    }, [userInfo])

    useEffect(() => {
        let _onlineList = Object.assign({}, onlineList, joinUser)
        setOnlineList(_onlineList)
    }, [joinUser])

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
                    <Room ref={room} tagList={tagList} socket={socket}></Room>
                </Col>
                <Col>
                    <People onlineList={onlineList}></People>
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