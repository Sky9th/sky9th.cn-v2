import React from "react";
import Button from "react-bootstrap/Button";

const Tag = (props) => {

    const {tagList} = props

    return <div className={"tag people"}>
        <div className={"title"}>
            标签
        </div>
        <div className={"tag-list"}>
            {tagList.map((value, index) => {
                return <div key={index} className={"item"}>
                    <Button variant={value.mark} size={"sm"}>{value.title} <span>{value.sum}</span></Button>

                </div>
            })}
        </div>
    </div>
};

export default Tag;