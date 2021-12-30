import React, {useEffect, useState} from "react";

import Toast from "react-bootstrap/Toast";
import {useDispatch, useSelector} from "react-redux";
import {noticePop} from "../services/store/reducer/noticeReducer";

const Notice = () => {

    const [now, setNow] = useState(new Date().getTime());
    const noticeList = useSelector(state => state.notice.list)
    const pinList = useSelector(state => state.notice.pin)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(noticePop())
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date().getTime())
        }, 1000)
        return () => clearInterval(interval)
    }, [now])

    const Item = (props) => {
        const TimeStr = (props) => {
            let time = new Date(props.time).getTime();
            let distance = Math.ceil((now - time) / 1000);
            let timeStr = '';
            if( distance > 60 ){
                timeStr = Math.ceil(distance / 60) + '分钟前'
            } else {
                timeStr = distance + '秒前'
            }
            return timeStr;
        }

        return <Toast key={props.index} delay={3000} autohide onClose={ handleClose }>
            <Toast.Header>
                <i className="bi bi-x-circle-fill"></i>
                <strong className="mr-auto">{props.val.title}</strong>
                <small><TimeStr time={props.val.time} /></small>
            </Toast.Header>
            <Toast.Body>{props.val.msg}</Toast.Body>
        </Toast>
    }

    return (
        <div id={"toastList"}>
            {
                Object.keys(pinList).map((val, index) => {
                    return <Item key={index} index={index} val={val}></Item>
                })
            }
            {
                noticeList.map((val, index) => {
                    return <Item key={index} index={index} val={val}></Item>
                })
            }
        </div>
    )
}

export default Notice;