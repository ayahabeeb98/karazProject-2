import React from 'react';
import {Nav, NavbarBrand, NavItem, NavLink, UncontrolledCollapse} from 'reactstrap';
import {logo,tables} from '../../img/dashboard';
import {Link} from "react-router-dom";


class MobileSideMenu extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            isActive : false
        }

    }

    toggle = () => {
        const menu = document.getElementById('mobileMenu');
        menu.classList.toggle("open");
        this.setState({isActive : !this.state.isActive})
    };

    render() {
        return (
            <aside className="sideMenu">
                <span onClick={this.toggle} className="sideMenuIcon"> <i className="fa fa-bars"></i> </span>
                <Nav vertical id="mobileMenu">
                    {/** NavBar Brand **/}
                    <NavbarBrand href="/" className="mr-auto">
                        <img src={logo} alt="logo"/>
                    </NavbarBrand>
                    <hr/>
                    <NavItem>
                        <NavLink href="#" className="asideLink active">
                            <span><i className="fa fa-desktop"></i> Dashboard</span>
                            <span className="asideBadge">+35</span>
                        </NavLink>
                    </NavItem>

                    <NavItem >
                        <NavLink id="toggler" href="#" className="asideLink">
                            <span><img src={tables} alt="icon"/> Tables</span>
                            <i className="fa fa-angle-right"></i>
                        </NavLink>
                    </NavItem>

                    <UncontrolledCollapse toggler="#toggler">
                        <NavItem>
                            <NavLink tag={Link} to='/dashboard/users-data' className="asideLink pl-5">Users data</NavLink>
                        </NavItem>
                    </UncontrolledCollapse>
                </Nav>
            </aside>
        )
    }
}

export default MobileSideMenu;