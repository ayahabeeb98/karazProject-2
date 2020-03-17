import React from "react";
import {Nav , NavLink , NavItem , UncontrolledCollapse } from 'reactstrap';
import {tables} from '../../img/dashboard';
import {Link} from "react-router-dom";

const SideBar = () =>  {
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
                        <NavLink tag={Link} to='/dashboard/users-data' className="asideLink pl-5">Users data</NavLink>
                    </NavItem>
                </UncontrolledCollapse>

            </Nav>
        </aside>
    )


};

export default SideBar;
