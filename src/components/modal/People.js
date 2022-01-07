import Modal from "react-bootstrap/Modal";
import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {ListGroup, Form} from "react-bootstrap";
import http from "../../services/http";

let timeout;

const PeopleModal = () => {

    const showPeople = useSelector(state => state.modal.showPeople)
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState('');
    const [peopleList, setPeopleList] = useState([]);

    const handleClose = () => {
        dispatch({type:'modal/setVisible',payload:{modal:'people'}})
    }

    const handleChange = (e) => {
        console.log(22)
        setNickname(e.target.value)
    }

    useEffect(() => {
        clearTimeout(timeout)
        if (nickname && nickname.length >= 4) {
            timeout = setTimeout(() => {
                http.$('chat/people', {nickname: nickname}).then((data) => {
                    console.log(data)
                    setPeopleList(data.data.data);
                })
            }, 1000)
        }
    }, [nickname])

    return <Modal show={showPeople} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>人群</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group controlId="formBasicEmail">
                <Form.Control placeholder="搜索昵称" value={nickname} onChange={handleChange} />
            </Form.Group>

            <ListGroup>
                {
                    peopleList.map((val, index) => {
                        return <ListGroup.Item key={index}>{val.nickname}</ListGroup.Item>
                    })
                }
            </ListGroup>
        </Modal.Body>
    </Modal>

}

export default PeopleModal