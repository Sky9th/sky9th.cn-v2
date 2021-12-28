import React from "react";

export default () => {
    return <div className={"people"}>
        {
            [...Array(10)].map(() => {
                return <div className={"item"}>11</div>
            })
        }
    </div>
};