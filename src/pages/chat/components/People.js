import React from "react";
import Button from "react-bootstrap/Button";

const People = () => {
    return <div className={"people"}>
        <div className={"title"}>
            人来人往
        </div>
        <div className={"people-list"}>
            {
                [...Array(10)].map((val, index) => {
                    return <div className={"item"} key={index}></div>
                })
            }
        </div>
        <Button className={"sum"}>
            人群 <span>(999 人)</span>
        </Button>
    </div>
};

export default People;