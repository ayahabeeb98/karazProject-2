import React, {useState} from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Collapse, Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup
} from "reactstrap";
import {passwordIcon, locationIcon, web, mobile} from "../../../img";
import {Link} from 'react-router-dom';

const Security = () => {
    const [isOpenPassword, setIsOpenPassword] = useState(false);
    const [isOpenLogin, setIsOpenLogin] = useState(false);
    const [DropdownOpen,setDropdownOpen] = useState(false);

    const DropDownToggle = () => setDropdownOpen(prevState => !prevState);

    const toggle = () => setIsOpenPassword(!isOpenPassword);
    const toggleLogin = () => setIsOpenLogin(!isOpenLogin);


    return (
        <Card id="securityCard">
            <CardHeader>الأمان</CardHeader>
            <CardBody className="cardSection">
                <span>
                    <img src={passwordIcon} alt="pass"/>
                </span>
                <div className="cardBody">
                    <h4>تغيير كلمة المرور</h4>
                    <p>من الجيد إستخدام كلمة سر قوية لا تستخدمها في أي مكان أخر</p>
                </div>
                <button className="cardBtn" onClick={toggle}>{
                    isOpenPassword ?  "إغلاق" : "تعديل"
                 }</button>
            </CardBody>

            <hr/>

            <Collapse isOpen={isOpenPassword}>
                <Form className="collapseWrapper">
                    <FormGroup className="settingForm">
                        <label htmlFor="current">
                            الحالية
                        </label>
                        <input type="text" id="current" value="" placeholder="كلمة المرور الحالية"/>
                    </FormGroup>

                    <FormGroup className="settingForm">
                        <label htmlFor="password">
                            الجديدة
                        </label>
                        <input type="text" id="password" value="" placeholder="كلمة المرور الجديدة"/>
                    </FormGroup>
                    <ul className="conditions" dir="rtl">
                        <li id="passwordLength" className="c">تحتوي علي 6 أحرف على الأقل</li>
                        <li id="letters" className="c">تحتوي ع أحرف صغيرة أو أحرف كبيرة</li>
                        <li id="numbers" className="c">تحتوي على رقم واحد على الأقل</li>
                        <li id="symbols" className="c">تحتوي على رمز واحد على الأقل</li>
                    </ul>

                    <Link to="/recover"> <small className="App-link">هل نسيت كلمة المرور؟</small> </Link>

                    <div className="line"></div>

                    <FormGroup  className="settingForm btn-form">
                        <button type="submit" className="btn" >
                            حفظ التغييرات
                        </button>
                    </FormGroup>

                </Form>

                <hr/>
            </Collapse>

            <CardBody className="cardSection">
                <span>
                    <img src={locationIcon} alt="location"/>
                </span>
                <div className="cardBody">
                    <h4>نشاط تسجيل دخول</h4>
                    <p>سيتم عرض جميع الأجهزة التي قمت بتسجيل الدخول منها</p>
                </div>
                <button className="cardBtn" onClick={toggleLogin}>
                    {isOpenLogin ?  "إغلاق" : "تعديل"}
                </button>
            </CardBody>



            <Collapse isOpen={isOpenLogin}>
                <hr/>
                <div className="collapseWrapper loginLog">
                    <span className="d-flex ">
                        <span className="loginLogDetails">
                            <span className="loginLocation">Khan Yunis, Palestine</span>
                            <small>كمبيوتر شخصي</small>
                        </span>
                        <span className="align-self-center"><img src={web} alt=""/></span>
                    </span>


                    <Dropdown isOpen={DropdownOpen} className="settingDropDown" toggle={DropDownToggle}>
                        <DropdownToggle tag="a">
                            <i className="fa fa-ellipsis-v"></i>
                        </DropdownToggle>
                        <DropdownMenu className="text-right">
                            <DropdownItem>كنت أنا</DropdownItem>
                            <DropdownItem>لم أكن أنا</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>

                </div>
                <hr/>
                <div className="collapseWrapper loginLog">
                    <span className="d-flex ">
                        <span className="loginLogDetails">
                            <span className="loginLocation">Khan Yunis, Palestine</span>
                            <small>تطبيق كرز</small>
                        </span>
                        <span className="align-self-center"><img src={mobile} alt=""/></span>
                    </span>

                    <Dropdown className="settingDropDown">
                        <DropdownToggle tag="a">
                            <i className="fa fa-ellipsis-v"></i>
                        </DropdownToggle>
                        <DropdownMenu className="text-right">
                            <DropdownItem>كنت أنا</DropdownItem>
                            <DropdownItem>لم أكن أنا</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                <div className="logoutAllSession">
                    <button className="btn w-100">
                        تسجيل الخروج من جميع التطبيقات
                    </button>
                </div>
            </Collapse>


        </Card>
    )
};


export default Security;