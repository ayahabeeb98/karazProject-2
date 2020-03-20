import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown} from "reactstrap";
import {menu, profilePic,setting,help,payment,booking,saved,see,darkMode,logout} from "../../img";

const DropDownNav = () => {
    return (
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
                <span className="iconWrapper">
                    <img src={menu} alt="avatar" className="bars"/>
                </span>
            </DropdownToggle>
            <DropdownMenu className="text-right">
                <DropdownItem className="dropInfo">
                    <img src={profilePic} alt="avatar" className="pic"/>
                    <div className="nameAndStatus">
                        <span className="userName">يمان المغني</span>
                        <span className="activeStatus">نشط الآن</span>
                    </div>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem className="dropInfo">
                    <div className="dropOption">
                        <img src={setting} alt="seeting"/>
                        الإعدادات
                    </div>
                    <i className="fa fa-arrow-left"></i>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem>
                    Logout
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>

    )
};


export default DropDownNav;