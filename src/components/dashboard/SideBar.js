import React from "react";
import {Nav , NavLink , NavItem , UncontrolledCollapse } from 'reactstrap';
import {tables} from '../../img/dashboard';

const SideBar = (props) =>  {
    return (
        <aside className="mainAside">
            <span className="asideLabel">main</span>
            <Nav vertical>
                <NavItem>
                    <NavLink href="#" className="asideLink active">
                        <span><i className="fa fa-desktop"></i> Dashboard</span>
                        <span className="asideBadge">+35</span>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink id="tables" href="#" className="asideLink">
                        <span><img src={tables} alt="icon"/> Tables</span>
                        <i className="fa fa-angle-right"></i>
                    </NavLink>
                </NavItem>
                <UncontrolledCollapse toggler="#tables">
                    <NavItem>
                        <NavLink>Users data</NavLink>
                    </NavItem>
                </UncontrolledCollapse>

            </Nav>
        </aside>
    )


};

export default SideBar;
