import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Top from './Components/Top'
import Banner from "./Components/Banner";
import Git from "./Components/Git";
import Feature from "./Components/Feature";
import Project from "./Components/Project";
import Skill from "./Components/Skill";
import Footer from "./Components/Footer";

import {useParams, useLocation} from "react-router-dom";

const App = () => {

    let params = useParams();
    console.log(params)
    let location = useLocation();
    console.log(location)

    return <Container>
        <Row>
            <Col>
                <Top/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Banner/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Git/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Feature/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Project/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Skill/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Footer/>
            </Col>
        </Row>
    </Container>
};

export default App