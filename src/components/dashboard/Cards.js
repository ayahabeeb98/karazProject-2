import React from 'react';
import {Card, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap";
import {activeUsers, newUser, visits} from "../../img/dashboard";


const Cards = (props) => {
    return (
        <Col className="pr-0">
            <Card body className="dashboardCard">
                <CardTitle className="cardTitle">
                    {props.Title}
                </CardTitle>
                <span className="duration">Duration {props.duration}</span>
                <h3 className="cardNumber mt-1" id="cardNumber">{props.total}</h3>
                <p className="description">
                    <span className="rate up">
                        <i className="fa fa-arrow-up"></i>  {props.rate}
                    </span> Up From {props.duration}
                </p>
                <p className="targetNumber">{props.targetUser} Target Users</p>
                <span className="cardIcon">
                    <img src={props.src} alt="newUser"/>
                </span>

                <Dropdown isOpen={props.isOpen} className="cardMenu" toggle={props.toggle}>
                    <DropdownToggle tag="a">
                        <i className="fa fa-ellipsis-v"></i>
                    </DropdownToggle>
                    <DropdownMenu right className="p-0">
                        {props.children}
                    </DropdownMenu>
                </Dropdown>


            </Card>
        </Col>
    )
};

//
// <Row xs="1" md="3">
//
//     <Cards Title="Visits" duration="Yesterday" total = {total} rate="12.5%" targetUser="425.21"
//            isOpen = {dropdownOpen} src={visits} toggle={toggle} >
//
//         <DropdownItem onClick={changeData}>Last day</DropdownItem>
//         <DropdownItem>Current month</DropdownItem>
//         <DropdownItem>Current year</DropdownItem>
//         <DropdownItem>Calender</DropdownItem>
//
//     </Cards>
//
//     <Cards Title="New Users" duration="Yesterday" total = "238k" rate="30.7%" targetUser="425.21"
//            isOpen = {dropdownOpenTwo} src={newUser} toggle={toggleTwo} >
//
//         <DropdownItem onClick={changeData}>Last day</DropdownItem>
//         <DropdownItem>Current month</DropdownItem>
//         <DropdownItem>Current year</DropdownItem>
//         <DropdownItem>Calender</DropdownItem>
//
//     </Cards>
//
//
//     <Cards Title="Active Users" duration="Yesterday" total = "204" rate="3.7%" targetUser="1254"
//            isOpen={dropdownOpenTh} src={activeUsers} toggle={toggleTh} >
//
//         <DropdownItem onClick={changeData}>Last day</DropdownItem>
//         <DropdownItem>Current month</DropdownItem>
//         <DropdownItem>Current year</DropdownItem>
//         <DropdownItem>Calender</DropdownItem>
//
//     </Cards>
//
// </Row>

export default Cards;


