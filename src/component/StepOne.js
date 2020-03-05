import React from 'react';
import {signup} from "../img/img";
import {Link} from "react-router-dom";

export default function Steps() {

    return (
        <div className="choices w-100">
            <img src={signup} alt="create profile" className="createVector"/>
            <div className="choices mb-4">
                <p className="help">سوف نساعدك علي إنشاء حساب في خطوتين فقط</p>
                <Link to="/signup/stepOne" type="button" className="btn btn-custom btn-login mb-0">التالي</Link>
            </div>
        </div>

    )
}