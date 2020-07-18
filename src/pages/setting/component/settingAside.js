import React from 'react';
import { Nav, NavItem, NavLink} from "reactstrap";
import {userInfo,security,notification,lang,rateApp,shareApp} from '../../../img';

const settingAside = () =>{
    return (
        <aside className="settingAside">
         <p className="settingHeader">الإعدادات</p>
            <Nav vertical className="text-right">
                <NavItem>
                    <NavLink href="#" className="settingLink active">
                        <span>المعلومات الشخصية</span>
                        <img src={userInfo} alt="user"/>
                    </NavLink>
                </NavItem>

                <hr className="my-2"/>

                <NavItem>
                    <NavLink href="#" className="settingLink">
                        <span>الأمان والخصوصية</span>
                        <img src={security} alt="secure"/>
                    </NavLink>
                </NavItem>

                <hr className="my-2"/>

                <NavItem>
                    <NavLink href="#" className="settingLink ">
                        <span>الإشعارات</span>
                        <img src={notification} alt="notification"/>
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink href="#" className="settingLink">
                        <span>اللغة</span>
                        <img src={lang} alt="lang"/>
                    </NavLink>
                </NavItem>

                <hr className="my-2"/>

                <NavItem>
                    <NavLink href="#" className="settingLink">
                        <span>قيم التطبيق</span>
                        <img src={rateApp} alt="rate"/>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="settingLink">
                        <span>شارك التطبيق</span>
                        <img src={shareApp} alt="share"/>
                    </NavLink>
                </NavItem>
            </Nav>
        </aside>
    )
};

export default settingAside;

