import React, {useEffect, useState} from "react";

import Dropdown from "react-bootstrap/Dropdown";
import http from "../../../services/http";

const ListItem = () => (
    <div className={"room-item"}>
        <div className={"avatar"}></div>
        <div className={"content"}>
            <div className={"info"}>
                <span className={"name"}>Sky9th</span>
                <span className={"time"}>2021-12-28 23:01</span>
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
                各位大佬，有没有碰到一个问题，我这边使用el-upload上传的是一个比价大的apk文件，上传的时候可以取消上传。我使用axios的cancaltoken方法取消了https请求，然后将fileList=[]，并且也调用了this.$refs.upload.clearFiles()。但是再次选择文件上传时，就是没反应
            </div>
            <div className={"reply"}>
                <div className={"room-item"}>
                    <div className={"avatar"}></div>
                    <div className={"content"}>
                        <div className={"info"}>
                            <span className={"name"}>Sky9th</span>
                            <span className={"time"}>2021-12-28 23:01</span>
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
                            各位大佬，有没有碰到一个问题，我这边使用el-upload上传的是一个比价大的apk文件，上传的时候可以取消上传。我使用axios的cancaltoken方法取消了https请求，然后将fileList=[]，并且也调用了this.$refs.upload.clearFiles()。但是再次选择文件上传时，就是没反应
                        </div>
                    </div>
                </div>
            </div>
            <div className={"attach"}>
                <div className={"attach-item"}>
                    <img src="./assets/img/logo.png" alt=""/>
                </div>
            </div>
        </div>
    </div>
)

const Room = () => {
    const [chatHeight, setChatHeight] = useState(window.innerHeight - 190);
    const [listItem, setListItem] = useState([])

    useEffect(() => {

        http.$('index').then((data) => {
            setListItem(data.data.data)
        })

        function updateSize () {
            setChatHeight(window.innerHeight - 190)
        }
        window.addEventListener('resize', updateSize)
        return function cleanup() {
            window.removeEventListener('resize', updateSize)
        }
    }, [])

    return <div className={"room"}>
        <div className={"room-list"} style={{height:chatHeight + 'px'}}>
            {listItem.map((index) => {
                return <ListItem key={index} />
            })}
        </div>
        <div className={"room-input"}>
            <div className={"avatar"}></div>
            <div className={"input"}><textarea placeholder={"点击此处输入您的想要发送的信息"}></textarea></div>
        </div>
    </div>
};

export default Room;