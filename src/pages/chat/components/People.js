import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import http from "../../../services/http";
import {useDispatch, useSelector} from "react-redux";
import Avatar from "../../../components/Avatar";

const People = (props) => {

    const [peopleList, setPeopleList] = useState({data:[]})
    const userInfo = useSelector(state => state.profile.userInfo)
    const dispatch = useDispatch();

    useEffect(() => {
        getPeople();
    }, [])

    const getPeople = () => {
        http.$('chat/people').then((data) => {
            setPeopleList(data.data)
        })
    }

    return (
    <div>
        {Object.keys(userInfo).length > 0 && <div className={"people"}>
            <div className={"title"}>
                此间人  <span>{Object.keys(props.onlineList).length}人</span>
            </div>
            <div className={"people-list"}>
                {
                    Object.keys(props.onlineList).map((val, index) => {
                        return <Avatar className={"item " + (props.onlineList[val].typing ? 'typing' : '')} key={index} avatar={props.onlineList[val].avatar}></Avatar>
                    })
                }
            </div>
        </div>}
        <div className={"people"}>
            <div className={"title"}>
                往来人 <span>{peopleList.total}人</span>
                <Button className={"sum"} size={"sm"} onClick={() => dispatch({type:'modal/setVisible',payload:{modal:'people','visible':true}})}>人群</Button>
            </div>
            <div className={"people-list"}>
                {
                    peopleList.data.map((val, index) => {
                        return <Avatar className={"item"} key={index} avatar={val.avatar}></Avatar>
                    })
                }
            </div>
        </div>
    </div>
    )
};

export default People;