import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import http from "../../../services/http";

const People = (props) => {

    const [peopleList, setPeopleList] = useState({data:[]})

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
        <div className={"people"}>
            <div className={"title"}>
                此间人  <span>{Object.keys(props.onlineList).length}人</span>
            </div>
            <div className={"people-list"}>
                {
                    Object.keys(props.onlineList).map((val, index) => {
                        return <div className={"item"} key={index}><i className="bi bi-person-circle"></i></div>
                    })
                }
            </div>
        </div>
        <div className={"people"}>
            <div className={"title"}>
                往来人 <span>{peopleList.total}人</span>
                <Button className={"sum"} size={"sm"}>
                    人群
                </Button>
            </div>
            <div className={"people-list"}>
                {
                    peopleList.data.map((val, index) => {
                        return <div className={"item"} key={index}><i className="bi bi-person-circle"></i></div>
                    })
                }
            </div>
        </div>
    </div>
    )
};

export default People;