import React from "react";
import PeopleModal from "./Sign";
import SignModal from "./People";
import Loading from "../Loading";
import AvatarModal from "./Avatar";
import Notice from "../Notice";

const Modal = () => {
    return (
        <>
            <Notice />
            <SignModal />
            <PeopleModal />
            <Loading />
            <AvatarModal />
        </>
    )
}

export default Modal;