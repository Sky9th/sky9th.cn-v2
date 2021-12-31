import React, {createRef, useEffect, useState} from "react";

import Dropdown from "react-bootstrap/Dropdown";
import http from "../../../services/http";
import {useSelector} from "react-redux";
import env from "../../../config/env";

const ListItem = (props) => {
    return (<div className={"room-item"}>
        <div className={"avatar"}><i className="bi bi-person-circle"></i></div>
        <div className={"content"}>
            <div className={"info"}>
                <span className={"name"}>{props.value.user.mail}</span>
                <span className={"time"}>{props.value.create_time}</span>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic"><i className="bi bi-three-dots"></i></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">回复</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">删除</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">收藏</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className={"msg"}>
                {props.value.content}
            </div>
            {props.value.reply && props.value.reply.length > 0 && <div className={"reply"}>
                { props.value.reply.map((value, index) => {
                    return <ListItem key={index} value={value} />
                })}
            </div>}
            {props.value.pictures && props.value.pictures.length > 0 && <div className={"attach"}>
                {props.value.pictures.map((value, index) => {
                    return (<div key={index} className={"attach-item"}>
                        <img src={env[process.env.NODE_ENV]['host'] + 'storage/' + value.src} alt={value.title} />
                    </div>)
                })}
            </div>}
        </div>
    </div>)
}

const Room = () => {
    const [chatHeight, setChatHeight] = useState(window.innerHeight - 190);
    const [listItem, setListItem] = useState([])
    const userInfo = useSelector(state => state.profile.userInfo)
    const room = createRef();

    const [msg, setMsg] = useState('')

    useEffect(() => {
        getMsg();
        window.addEventListener('resize', updateSize)
        return function cleanup() {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    useEffect(() => {
        room.current.scrollTop = room.current.scrollHeight
        const submitMsg = (event) => {
            if(event.code === 'Enter' && event.ctrlKey === true && msg !== ''){
                http.$('chat/submit', {content: msg, type: 0}).then(() => {
                    setMsg('');
                    room.current.scrollTop = room.current.scrollHeight
                    getMsg();
                })
            }
        }
        window.addEventListener('keydown', submitMsg)
        return function cleanup() {
            window.removeEventListener('keydown', submitMsg)
        }
    }, [msg, room])

    const getMsg = () => {
        http.$('chat/index').then((data) => {
            setListItem(data.data)
        })
    }

    const onChange = (event) => {
        setMsg(event.target.value)
    }

    const updateSize = () => {
        setChatHeight(window.innerHeight - 190)
    }

    return <div ref={room} className={"room"}>
        <div className={"room-list"} style={{height:chatHeight + 'px'}}>
            {listItem.map((value, index) => {
                return <ListItem key={index} value={value} />
            })}
        </div>
        <form>
        <div className={"room-input"}>
            <div className={"avatar"}><i className="bi bi-person-circle"></i></div>
            <div className={"input"}>
                {userInfo.mail && <textarea placeholder={"点击此处输入您的想要发送的信息"} value={msg} onChange={onChange}></textarea>}
                {!userInfo.mail && <div className={"login"}>请先<span>登录</span></div>}
            </div>
        </div>
        </form>
    </div>
};

export default Room;