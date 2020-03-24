import React, {useState} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Collapse, Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup
} from "reactstrap";
import {privateIcon,activityLog} from "../../../img";
import {Link} from 'react-router-dom';

const Privacy = () => {

    return (
        <Card id="securityCard">
            <CardHeader>الخصوصية</CardHeader>
            <CardBody className="cardSection">
                <span>
                    <img src={privateIcon} alt="privateIcon"/>
                </span>
                <div className="cardBody">
                    <h4>حساب خاص</h4>
                    <p>سيتم  منع  إظهار الحساب في عمليات البحث</p>
                </div>

            </CardBody>

            <hr/>

            <CardBody className="cardSection">
                <span>
                    <img src={activityLog} alt="activityLog"/>
                </span>
                <div className="cardBody">
                    <h4>عرض حالة النشاط</h4>
                    <p>سيتم  عرض نشاط حسابك لمن يبحثون عنك</p>
                </div>

            </CardBody>

        </Card>
    )
};


export default Privacy;