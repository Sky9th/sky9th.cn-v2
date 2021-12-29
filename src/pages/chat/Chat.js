import React from "react";
import './Chat.scss'

import {Row, Col} from "react-bootstrap";

import Room from "./components/Room";
import Top from "../../components/Top";
import People from "./components/People";
import Tag from "./components/Tag";

const Chat = () => (
    <div>
        <div className={"chat"}>
            <Top/>
        </div>
        <Row noGutters={true}>
            <Col lg={9}>
                <Room></Room>
            </Col>
            <Col>
                <People></People>
                <Tag></Tag>
            </Col>
        </Row>
    </div>
);

export default Chat;