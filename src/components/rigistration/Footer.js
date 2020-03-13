import React from 'react';
import {Nav , NavLink , NavItem} from 'reactstrap';

const Footer = () => {
    return (
        <footer  id="mainFooter">
            <Nav className="bottom-nav">
                <NavItem>
                    <NavLink href="#">من نحن</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">مساعدة</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">الخصوصية</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">الشروط</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">اللغات</NavLink>
                </NavItem>
            </Nav>

            <small className="copyRight">
                حقوق النشر محفوظة لدي تطبيق كرز بيوتى
            </small>
        </footer>
    )
};


export default Footer;