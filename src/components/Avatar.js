import React from "react";
import {useDispatch} from "react-redux";
import util from "../util/util";

const Avatar = (props) => {

    const dispatch = useDispatch();

    const showModal  = () => {
        if(props.edit) util.modal.show(dispatch, 'avatar')
    }

    return (
        <div className={"avatar " + props.className} onClick={showModal}>
            {props.avatar && <img src={process.env.REACT_APP_HTTP_HOST + props.avatar} alt=""/> }
            {!props.avatar && <i className="bi bi-person-circle avatar"></i> }
        </div>
     )
}

export default Avatar