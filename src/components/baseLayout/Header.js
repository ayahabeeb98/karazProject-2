import React from 'react';
import {
    FormGroup,
    Input,
    Nav, Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
} from "reactstrap";
import {logo} from "../../img/dashboard";
import Form from "reactstrap/es/Form";
import {profilePic} from "../../img";
import DropDownNav from "./DropDownNav";


const Header = () => {
    return (
        <header className="mainHeader" dir="rtl">
            <Navbar light expand className="custom-container" style={{backgroundColor: "#FFF"}}>
                {/** NavBar Brand **/}
                <NavbarBrand href="/" className="mr-auto d-flex w-100">
                    <img src={logo} alt="logo"/>
                </NavbarBrand>

                {/** Search **/}
                <Form className="w-100 justify-content-center search-form">
                    <FormGroup className="w-75 mx-auto mb-0 form-wrapper">
                        <Input type="text" name="search" className="inpt" id="search" placeholder=" بحث عن خبيرة"/>
                        <span className="searchIconWrapper"><i className="fa fa-search"></i></span>
                    </FormGroup>
                </Form>

                <Nav className="ml-auto w-100 justify-content-end" navbar>
                    <NavItem className="mr-2 mobile-search">
                        <NavLink href="/components/">
                            <i className="fa fa-search IconBar"></i>
                        </NavLink>
                    </NavItem>
                    <NavItem className="mr-2">
                        <NavLink href="/components/">
                                <span className="avatarWrapper">
                                    <img src={profilePic} alt="avatar" className="pic" />
                                    <span className="userName">يمان المغني</span>
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
                    <DropDownNav/>
                </Nav>
            </Navbar>
        </header>
    )
};


export default Header;