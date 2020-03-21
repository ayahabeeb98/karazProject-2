import React from 'react';
import {Route} from "react-router-dom";
import {Col, Row} from "reactstrap";
import SideBar from "./component/settingAside";
import EditProfileInfo from "./EditProfileInfo";

const Setting = () => {
    return (
        <>
            <Row className="mx-0">
                <Col xs="9" className="pageContainer">
                    <Route path="/setting" component={EditProfileInfo}/>
                </Col>

                <Col xs="3" className="">
                    <SideBar/>
                </Col>

            </Row>
        </>
    )
};

export default Setting;