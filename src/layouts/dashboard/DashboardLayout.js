import React from 'react';
import './style.css';
import NavBar from '../../components/dashboard/NavBar';
import Header from "../../components/dashboard/Header";
import SideBar from "../../components/dashboard/SideBar";
import {Row , Col} from 'reactstrap';
import MobileSideMenu from "../../components/dashboard/MobileSideMenu";

const DashboardLayout = (props) => {
    return (
        <div id="dashboard">
            <NavBar />
            <Header/>

            <main className="custom-container">
                <MobileSideMenu />
                <Row className="mx-0 my-3">
                    <Col xs="3" className="sideBarWrapper">
                        <SideBar />
                    </Col>
                    <Col xs="9" className="pageContainer">
                        {props.children}
                    </Col>
                </Row>
            </main>
        </div>
    )
};

export default DashboardLayout;