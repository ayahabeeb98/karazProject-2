import React, {useState} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {menu, profilePic,setting,help,payment,booking,saved,see,darkMode,logout} from "../../img";
import Cookies from "universal-cookie/lib";
import {Redirect,Link} from 'react-router-dom';

const DropDownNav = ({name}) => {
    const [cookie] = useState(new Cookies());
    const [removed,setRemoved] = useState(false);
    const handleLogout = () => {
        cookie.remove("token", {path: '/'});
        setRemoved(true);
    };

    if (removed) {
        return <Redirect to='/login' />
    }

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
                        <span className="userName">{name}</span>
                        <span className="activeStatus">نشط الآن</span>
                    </div>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem className="dropInfo dropInfo-options" tag={Link} to="/setting">
                    <div className="dropOption">
                        <img src={setting} alt="seeting"/>
                        الإعدادات
                    </div>
                    <i className="fa fa-chevron-left dropdownArrow text-secondary"></i>
                </DropdownItem>
                <DropdownItem className="dropInfo dropInfo-options">
                    <div className="dropOption">
                        <img src={help} alt="help"/>
                        المساعدة والدعم
                    </div>
                    <i className="fa fa-chevron-left dropdownArrow text-secondary"></i>
                </DropdownItem>
                <DropdownItem className="dropInfo dropInfo-options">
                    <div className="dropOption">
                        <img src={payment} alt="pay"/>
                        الدفع
                    </div>
                    <i className="fa fa-chevron-left dropdownArrow text-secondary"></i>
                </DropdownItem>
                <DropdownItem className="dropInfo dropInfo-options">
                    <div className="dropOption">
                        <img src={booking} alt="booking"/>
                        حجوزاتي
                    </div>
                    <i className="fa fa-chevron-left dropdownArrow text-secondary"></i>
                </DropdownItem>
                <DropdownItem className="dropInfo dropInfo-options">
                    <div className="dropOption">
                        <img src={saved} alt="saved"/>
                        المحفوظات
                    </div>
                    <i className="fa fa-chevron-left dropdownArrow text-secondary"></i>
                </DropdownItem>
                <DropdownItem className="dropInfo dropInfo-options">
                    <div className="dropOption">
                        <img src={see} alt="see"/>
                        الرؤى
                    </div>
                    <i className="fa fa-chevron-left dropdownArrow text-secondary"></i>
                </DropdownItem>
                <DropdownItem className="dropInfo dropInfo-options">
                    <div className="dropOption">
                        <img src={darkMode} alt="darkMode"/>
                       الوضع الليلي
                    </div>
                    <i className="fa fa-chevron-left dropdownArrow text-secondary"></i>
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem className="dropInfo" onClick={() => handleLogout()}>
                    <img src={logout} alt="logout"/>
                    خروج
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem className="text-center">
                    التسجيل كخبيرة
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>

    )
};


export default DropDownNav;