import React from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Top from './components/Top'
import Banner from "./components/Banner";
import Git from "./components/Git";
import Feature from "./components/Feature";
import Project from "./components/Project";
import Skill from "./components/Skill";
import Footer from "./components/Footer";

import {useParams, useLocation} from "react-router-dom";

const App = () => (
    <div>
        <Container>
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
        </Container>
        <Container className={"footer-container"}>
            <Footer/>
        </Container>
        <Container className={"copyright"}>
            © Copyright 2020 — Sky9th & 粤ICP备15083833号
        </Container>

    </div>
);

export default App