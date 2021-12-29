import React from "react";
import Button from "react-bootstrap/Button";

const Tag = () => {
    return <div className={"tag people"}>
        <div className={"title"}>
            标签
        </div>
        <div className={"tag-list"}>
            <div className={"item"}>
                <Button variant="primary" size={"sm"}>提问</Button>
                <span>999</span>
            </div>
            <div className={"item"}>
                <Button variant="secondary" size={"sm"}>求助</Button>
                <span>999</span>
            </div>
            <div className={"item"}>
                <Button variant="success" size={"sm"}>吐槽</Button>
                <span>999</span>
            </div>
        </div>
    </div>
};

export default Tag;