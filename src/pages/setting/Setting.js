import React from 'react';
import {Route} from "react-router-dom";
import {Col, Row} from "reactstrap";
import SettingAside from "./component/SettingAside";
import EditProfileInfo from "./EditProfileInfo";
import './setting.css';

import SecurityAndPrivacy from "./component/SecurityAndPrivacy";

const Setting = () => {
    return (
        <>
            <Row className="mx-0">
                <Col xs="9" className="pageContainer">
                    <Route path="/setting" exact component={EditProfileInfo}/>
                    <Route path="/setting/securityAndPrivacy" component={SecurityAndPrivacy}/>
                </Col>

                <Col xs="3" className="">
                    <SettingAside/>
                </Col>

            </Row>
        </>
    )
};

export default Setting;