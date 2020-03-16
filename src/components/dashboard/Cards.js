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


// {cardData.map((item,index) => {
//     return <Col className="pr-0" key={'card '+index}>
//         <Card body className="dashboardCard">
//             <CardTitle className="cardTitle">
//                 New Users
//                 {console.log(item)}
//             </CardTitle>
//             <span className="duration">
//                             During this {item.duration}
//                         </span>
//             <h3 className="cardNumber mt-1">
                /*Display the counter if the total still null*/
{/*                {!item.total ? counter : item.total}*/}
{/*            </h3>*/}
{/*            <p className="description">*/}
{/*                            <span className={item.rate <= 0 ? "rate down" : "rate up"}>*/}
{/*                                {item.rate <= 0 ?*/}
{/*                                    <span>*/}
{/*                                        <i className="fa fa-arrow-down"></i>*/}
{/*                                        {Math.abs(item.rate)}%*/}
{/*                                    </span>*/}
{/*                                    : <span>*/}
{/*                                        <i className="fa fa-arrow-up"></i>*/}
{/*                                        {Math.abs(item.rate)}%*/}
{/*                                    </span>}*/}
{/*                            </span>*/}
{/*                {item.rate <= 0 ? " Down" : " Up"} From Last {item.duration}.*/}
{/*            </p>*/}

{/*            <p className="targetNumber">1254 Target Users</p>*/}
{/*            <span className="cardIcon">*/}
{/*                            <img src={newUser} alt="newUser"/>*/}
{/*                        </span>*/}
{/*        </Card>*/}


{/*        <Dropdown isOpen={NewUserDropdownOpen} className="cardMenu" toggle={NewUserToggle}>*/}
{/*            <DropdownToggle tag="a">*/}
{/*                <i className="fa fa-ellipsis-v"></i>*/}
{/*            </DropdownToggle>*/}
{/*            <DropdownMenu right className="p-0">*/}
{/*                <DropdownItem onClick={() => changeData("day")}>Today</DropdownItem>*/}
{/*                <DropdownItem onClick={() => changeData("month")}>Current month</DropdownItem>*/}
{/*                <DropdownItem onClick={() => changeData("year")}>Current year</DropdownItem>*/}
{/*                <DropdownItem>Calender</DropdownItem>*/}
{/*            </DropdownMenu>*/}
{/*        </Dropdown>*/}

{/*        {loading ? <span className="loading-cover" style={{*/}
{/*            display: "flex",*/}
{/*            position: "absolute",*/}
{/*            top: "35%",*/}
{/*            left: "11%",*/}
{/*            backgroundColor: "#fff"*/}
{/*        }}>*/}
{/*                    <i className="fa fa-spinner loadingIcon" style={{padding: "0.5rem"}}></i>*/}
{/*                </span> : null}*/}
{/*    </Col>*/}

{/*})}*/}
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


