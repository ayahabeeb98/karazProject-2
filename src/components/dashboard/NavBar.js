import React from 'react';
import {
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    FormGroup,
    Input,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown,
} from 'reactstrap';

import {avatar,logo} from '../../img/dashboard'
import Form from "reactstrap/es/Form";

const NavBar = () =>
    (
        <div style={{backgroundColor: "#FFF"}}>
            <Navbar light expand className="custom-container">
                {/** NavBar Brand **/}
                <NavbarBrand href="/" className="mr-auto d-flex w-100">
                    <img src={logo} alt="logo"/>
                </NavbarBrand>

                {/** Search **/}
                <Form className="w-100 justify-content-center">
                    <FormGroup className="w-75 mx-auto mb-0 form-wrapper">
                        <Input type="text" name="search" className="inpt" id="search" placeholder=" Search..."/>
                        <span className="searchIconWrapper"><i className="fa fa-search"></i></span>
                    </FormGroup>
                </Form>

                <Nav className="ml-auto w-100 justify-content-end" navbar>
                    <NavItem className="mr-2">
                        <NavLink href="/components/">
                                <span className="iconWrapper">
                                    <i className="fa fa-envelope IconBar"></i>
                                    <span className='IconBadge'>21</span>
                                </span>
                        </NavLink>
                    </NavItem>
                    <NavItem className="mr-2">
                        <NavLink href="/">
                            <span className="iconWrapper">
                                <i className="fa fa-bell IconBar"></i>
                                <span className='IconBadge'>2</span>
                            </span>
                        </NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar >
                        <DropdownToggle nav className="customArrow">
                            <img src={avatar} alt="avatar"/>
                        </DropdownToggle>
                        <DropdownMenu right className="text-left">
                            <DropdownItem>
                                Profile
                            </DropdownItem>
                            <DropdownItem>
                                Setting
                            </DropdownItem>
                            <DropdownItem divider/>
                            <DropdownItem>
                                Logout
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    );

export default NavBar;