import React from "react";
import './Chat.scss'

import {Row, Col} from "react-bootstrap";

import Room from "./components/Room";
import Top from "../../components/Top";
import People from "./components/People";

export default () => (
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
            </Col>
        </Row>
    </div>
);