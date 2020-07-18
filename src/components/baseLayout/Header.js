import React, {useEffect, useState} from 'react';
import {
    FormGroup,
    Input,
    Nav, Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
} from "reactstrap";
import Form from "reactstrap/es/Form";
import {brand, profilePic} from "../../img";
import DropDownNav from "./DropDownNav";
import Cookies from "universal-cookie/lib";
import axios from "axios";


const Header = () => {
    const [userName , setUserName] = useState('name');

    useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        axios.get('https://karaz6.herokuapp.com/api/user/profile', config)
            .then(response => {
                if (response.status === 200) {
                    setUserName(response.data.user.name)
                }
            }).catch(error => {
            console.log("profile error", error)
        })
    },[]);
    return (
        <header className="mainHeader" dir="rtl">
            <Navbar light expand className="custom-container py-0" style={{backgroundColor: "#FFF"}}>
                {/** NavBar Brand **/}
                <NavbarBrand href="/" className="mr-auto d-flex w-100">
                    <img src={brand} alt="logo"/>
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
                                    <span className="userName">{userName}</span>
                                </span>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/">
                            <span className="iconWrapper">
                                <i className="fa fa-bell IconBar"></i>
                                <span className='IconBadge'>5</span>
                            </span>
                        </NavLink>
                    </NavItem>
                    <DropDownNav name={userName}/>
                </Nav>
            </Navbar>
        </header>
    )
};


export default Header;