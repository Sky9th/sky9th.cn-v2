import React from "react";

const avatar = (props) => {
    return (
        <div className={"avatar"}>
            {props.avatar && <img src={process.env.REACT_APP_HTTP_HOST + props.avatar} alt=""/> }
            {!props.avatar && <i className="bi bi-person-circle avatar"></i> }
        </div>
     )
}

export default avatar