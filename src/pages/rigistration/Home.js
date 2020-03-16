import React from 'react';
import {Link} from "react-router-dom";

const Home = () => {

    React.useEffect(() => {
        document.title= "Karaz Beauty | Home";
        }, []);

    return (
        <div className="choices mt-5">
            <Link to='/login' className="btn btn-custom btn-login">تسجيل الدخول</Link>
            <Link to='/signup' className="btn btn-custom ">إنشاء حساب</Link>
            <Link to='/visitor' className="btn btn-custom ">الدخول كزائر</Link>
        </div>
    )
};

export default Home;