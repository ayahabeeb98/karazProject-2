import React from 'react';
import {logo,google,apple} from '../img/img';
import {Link} from 'react-router-dom';
import {Slider} from "../component/Slider";
import Footer from "../component/Footer";

export default function Home() {


    return (
        <div className="row mx-0 custom-row">

            {/*** Side Slider ****/}

            <Slider />

            {/*** Form ***/}
            <div className="col-lg-4 rightSide">

                <div className="box text-center">
                    <img src={logo} alt="logo" className="box-logo"/>

                    <div className="choices">
                        <Link to='/login' className="btn btn-custom btn-login">تسجيل الدخول</Link>
                        <Link to='/signup' className="btn btn-custom ">إنشاء حساب</Link>
                        <Link to='/visitor' className="btn btn-custom ">الدخول كزائر</Link>
                    </div>

                </div>

                <div className="discover text-center">
                    <p>احصل على التطبيق</p>
                    <img src={apple} className="app mr-2" alt="apple store"/>
                    <img src={google} className="app" alt="play store" />
                </div>

            </div>

            <Footer />
        </div>
    )
}

