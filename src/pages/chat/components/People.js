import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import http from "../../../services/http";

const People = () => {

    const [peopleList, setPeopleList] = useState({data:[]})

    useEffect(() => {
        getPeople();
    }, [])

    const getPeople = () => {
        http.$('chat/people').then((data) => {
            setPeopleList(data.data)
        })
    }

    return <div className={"people"}>
        <div className={"title"}>
            人来人往
        </div>
        <div className={"people-list"}>
            {
                peopleList.data.map((val, index) => {
                    return <div className={"item"} key={index}><i className="bi bi-person-circle"></i></div>
                })
            }
        </div>
        <Button className={"sum"}>
            人群 <span>({peopleList.total} 人)</span>
        </Button>
    </div>
};

export default People;