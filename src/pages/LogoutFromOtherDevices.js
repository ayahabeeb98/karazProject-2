import React from 'react';
import {apple, google} from "../img/img";
import {Link} from "react-router-dom";


class LogoutFromOtherDevices extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedOption: "keepOnLine"
        }
    }

    handleChange = (e) => {
        this.setState({
            selectedOption : e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/reset-password');
    };

    render() {
        const {selectedOption} = this.state;
        return (
            <div className="col-md-4">
                <div className="box text-center mb-2">
                    <p className="headerText mt-3">تسجيل الخروج من الأجهزة الأخرى</p>
                    <p className="description">يمكنك تسجيل الخروج من أي جهاز
                        تعتقد أن حسابك فعال فيه</p>

                    <form action="" className="mainForm" onSubmit={this.handleSubmit}>

                        <div className=" options mb-2 p-3">

                            <div className="form-group custom-form-group mb-0">
                                <label className="custom-checkbox text-right mb-0" htmlFor="option1">
                                    <span className="mainLabel">بقائي متصلًا</span>
                                    <input type="radio" className="default-check" name="confirm" id="option1"
                                           checked={selectedOption === "phone"} onChange={this.handleChange} value="phone"
                                    />
                                    <span className="customRadio"></span>
                                </label>
                            </div>

                            <hr/>

                            <div className="form-group custom-form-group mb-0">
                                <label className="custom-checkbox text-right mb-0" htmlFor="option2">
                                    <span className="mainLabel">خروجي من جميع الأجهزة المتصلة</span>
                                    <input type="radio" className="default-check" name="confirm" id="option2"
                                           checked={selectedOption === "email"} onChange={this.handleChange} value="email"
                                    />
                                    <span className="customRadio"></span>
                                </label>
                            </div>

                        </div>

                        <div className="choices mt-4">
                            <button type="submit" className="btn btn-custom btn-login">الإستمرار</button>
                        </div>

                    </form>
                </div>

                <div className="d-flex">
                       <span className="text-center w-100 ">
                           <Link to='/signup' className="btn"><small>لم يعد لك إمكانية الوصول إلي هذا الحساب؟</small></Link>
                       </span>
                </div>

                <div className="discover text-center mt-4">
                    <p>احصل على التطبيق</p>
                    <img src={apple} className="app mr-2" alt="apple store"/>
                    <img src={google} className="app" alt="play store" />
                </div>
            </div>
        );
    }

}

export default LogoutFromOtherDevices;