import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import http from "../../services/http";

const AvatarModal = () => {

    const showAvatar = useSelector(state => state.modal.showAvatar)
    const dispatch = useDispatch();
    const [avatar, setAvatar] = useState('')
    const [avatarList, setAvatarList] = useState([])

    useEffect(() => {
        getAvatarList();
    },[showAvatar])

    const getAvatarList = () => {
        http.$('avatar').then((data) => {
            console.log(data.data)
            setAvatarList(data.data)
        })
    }

    const handleClose = () => {
        dispatch({type:'modal/setVisible',payload:{modal:'avatar'}})
    }

    const avatarFormik = useFormik({
        initialValues: {
            avatar: "",
        },
        validationSchema: Yup.object({
            avatar: Yup.string().required('请选择头像'),
        }),
        onSubmit: values => {
            http.$('setAvatar', values).then(() => {
                dispatch({type:"profile/setUserInfo", payload:{avatar: values.avatar}})
                handleClose()
            })
        },
    });

    const onSetAvatar = (val, v) => {
        setAvatar('/static/avatar/' + val + '/' + v)
        avatarFormik.setFieldValue('avatar', '/static/avatar/' + val + '/' + v)
    }

    return (
        <Modal show={showAvatar} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>选择头像</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    Object.keys(avatarList).map((val, index) => {
                        return (
                            <div className={"avatar-selector"} key={index}>
                                {/*<div className={"title"}>{val}</div>*/}
                                <div className={"avatar-list"}>
                                    {Object.keys(avatarList[val]).map((v, i) => {
                                        return (
                                            <div key={i} className={"item " + val + (avatar === '/static/avatar/' + val + '/' + avatarList[val][v] ? ' selected' : '')} onClick={()=>{onSetAvatar(val,avatarList[val][v])}}><img src={process.env.REACT_APP_HTTP_HOST + '/static/avatar/' + val + '/' + avatarList[val][v]} width={"50px"} alt={v}/></div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })
                }
                <Form noValidate onSubmit={avatarFormik.handleSubmit}>
                    <Button varinat={"primary"} type={"submit"}>提交</Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default AvatarModal