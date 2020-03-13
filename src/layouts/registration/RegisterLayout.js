import React from 'react';
import {Row, Col} from 'reactstrap';
import './style.css';
import Slider from "../../components/rigistration/Slider";
import Footer from "../../components/rigistration/Footer";
import {logo,apple,google} from '../../img'
import {Link} from 'react-router-dom';

import { useLocation} from "react-router-dom";


const RegisterLayout = (props) => {

    let location = useLocation().pathname;
    return (
            <Row id="registration" className="mx-0">
                <Col lg="8" className="px-0 leftSide">
                    <Slider/>
                </Col>

                <Col lg="4" className="px-0 rightSide">

                    <div className="box text-center">

                        {location === '/login' || location === '/recover' || location === '/' ||
                            location === '/signup' || location === '/signup/stepOne' || location === "/signup/stepTwo"
                        ?
                            <img src={logo} alt="logo" className="logo"/>
                        : null }



                            {props.children}

                    </div>

                    {location === '/login' ?
                        <div className="d-flex">
                            <span className="text-center w-100">
                            <Link to='/signup' className="btn App-link">إنشاء حساب</Link>لا يوجد لديك حساب؟
                            </span>
                        </div> : null
                    }

                    {location === '/signup' || location === '/signup/stepOne' || location === "/signup/stepTwo" ?
                        <div className="d-flex">
                               <span className="text-center w-100 ">
                                   <Link to='/login' className="btn App-link">تسجيل الدخول</Link> لديك حساب؟
                               </span>
                        </div> : null
                    }


                    <div className="discover text-center mt-2">
                        <p>احصل على التطبيق</p>
                        <img src={apple} className="app mr-2" alt="apple store"/>
                        <img src={google} className="app" alt="play store"/>
                    </div>


                </Col>

                <Footer/>
            </Row>

    )
};


export default RegisterLayout;