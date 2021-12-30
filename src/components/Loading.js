import React from "react";

import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
    return <div id={"loading"} style={{display:'none'}}>
        <Spinner animation={"border"} variant="primary"></Spinner>
    </div>
}

export default Loading;