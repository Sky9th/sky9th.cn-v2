import React, {createRef, forwardRef, useEffect, useImperativeHandle, useState} from "react";

import Dropdown from "react-bootstrap/Dropdown";
import http from "../../../services/http";
import {useSelector} from "react-redux";
import env from "../../../config/env";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Badge from "react-bootstrap/Badge";
import Avatar from "../../../components/Avatar";

const ListItem = (props) => {
    return (<div className={"room-item"}>
        <Avatar avatar={props.value.user.avatar}></Avatar>
        <div className={"content"}>
            <div className={"info"}>
                <span className={"name"}>{props.value.user.nickname}</span>
                <span className={"tag"}>
                    {props.tagList.map((value, index) => {
                        if(value.id === props.value.tag){
                            return <Badge key={index} pill variant={value.mark}>{value.title}</Badge>
                        }
                        return "";
                    })}
                </span>
                <span className={"time"}>{props.value.create_time}</span>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" disabled><i className="bi bi-three-dots"></i></Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">回复</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">删除</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className={"msg"}>
                {props.value.content}
            </div>
            {props.value.reply && props.value.reply.length > 0 && <div className={"reply"}>
                { props.value.reply.map((value, index) => {
                    return <ListItem key={index} value={value} tagList={props.tagList} />
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

const Room = (props, ref) => {
    const {tagList} = props;
    const [chatHeight, setChatHeight] = useState(window.innerHeight - 190);
    const [listItem, setListItem] = useState([])
    const [tag, setTag] = useState('闲聊')
    const [tagID, setTagID] = useState('1')
    const [typing, setTyping] = useState(false)
    const userInfo = useSelector(state => state.profile.userInfo)
    const room = createRef();
    const [msg, setMsg] = useState('')

    useImperativeHandle(ref, () => ({
        listItem, setListItem, msg, setMsg
    }))

    useEffect(() => {
        getMsg();

        window.addEventListener('resize', updateSize)
        return function cleanup() {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    const submitMsg = (event, click) => {
        if((event.code === 'Enter' && event.ctrlKey === true && msg !== '') || click){
            // http.$('chat/submit', {content: msg, tag: tagID}).then(() => {
            //     setMsg('');
            //     getMsg();
            // })
            props.socket.emit('ToAll', {content: msg, tag: tagID})
            setMsg('')
        }
    }

    useEffect(() => {
        room.current.scrollTop = room.current.scrollHeight
        window.addEventListener('keydown', submitMsg)
        return function cleanup() {
            window.removeEventListener('keydown', submitMsg)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [msg, room])

    const getMsg = () => {
        http.$('chat/index').then((data) => {
            setListItem(data.data.reverse())
        })
    }

    const onChange = (event) => {
        setMsg(event.target.value)
        if (event.target.value.length > 0 && !typing){
            setTyping(true)
            props.socket.emit('typing', true)
        }
    }

    const onFocus = (event) => {
        if (event.target.value.length > 0 && !typing){
            setTyping(true)
            props.socket.emit('typing', true)
        }
    }

    const onBlur = () => {
        setTyping(false)
        props.socket.emit('typing', false)
    }

    const updateSize = () => {
        setChatHeight(window.innerHeight - 190)
    }

    const selectTag = (tag) => {
        setTag(tag.title)
        setTagID(tag.id)
    }

    return <div className={"room"}>
        <div ref={room} className={"room-list"} style={{height:chatHeight + 'px'}}>
            {listItem.map((value, index) => {
                return <ListItem key={index} value={value} tagList={tagList} />
            })}
        </div>
        <form>
        <div className={"room-input"}>
            <div className={"avatar"}><i className="bi bi-person-circle"></i></div>
            <div className={"input"}>
                {userInfo.mail &&
                <textarea placeholder={"点击此处输入您的想要发送的信息，Ctrl+Enter可快速发送"} value={msg} onChange={onChange} onFocus={onFocus} onBlur={onBlur}></textarea>}
                {!userInfo.mail && <div className={"login"}>请先<span>登录</span></div>}
            </div>
            <div className={"control"}>
                <DropdownButton size={"sm"} variant={"dark"} title={tag} drop={"up"}>
                    {tagList.map((value, index) => {
                        return <Dropdown.Item key={index} onClick={() => selectTag(value)}>{value.title}</Dropdown.Item>
                    })}
                </DropdownButton>
                <Button size={"sm"} onClick={(e) => submitMsg(e, true)} disabled={!msg}>发送</Button>
            </div>
        </div>
        </form>
    </div>
};

export default forwardRef(Room);