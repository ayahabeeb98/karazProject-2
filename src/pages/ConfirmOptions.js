import React from 'react';
import {apple, avatar, google, logo} from "../img/img";
import {Link} from "react-router-dom";
import axios from "axios";
import {encodeEmail} from "../component/Validator";

class ConfirmOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedOption: "email",
            userInfo : {},
            allowed : false
        };

    }

    componentWillMount (){
        if(this.props.location.state === undefined) {
            this.props.history.push('/login')
        }else {
            this.setState({
                userInfo : this.props.location.state.userInfo,
                allowed : true
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            selectedOption : e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const {userInfo} = this.state;
        const userEmail = {email : userInfo.email};
        axios.post('http://karaz5.herokuapp.com/api/forgetPassword/sendEmail',userEmail)
            .then(Response => {
                const id = Response.data.sucess._id;
                this.props.history.push({
                    pathname: '/recover/code',
                    state : {
                        id,
                        email : userInfo.email
                    }
                });
            })
            .catch( error => {
                    console.log(error)
                }
            );
    };

    render() {
        const {selectedOption,userInfo,allowed} = this.state;
        if(!allowed) {return null}
        const email = encodeEmail(userInfo.email);
        return (

            <div className="col-lg-4 rightSide">
                <div className="box text-center mb-2">
                    <img src={logo} alt="logo" className="box-logo mb-0"/>
                    <p className="headerText">تأكيد الحساب</p>
                    <p className="subHeader">سوف نرسل لك رمزاً يمكنك إستخدامه
                        في تسجيل الدخول</p>

                        <form action="" className="mainForm" onSubmit={this.handleSubmit}>
                            <div className=" options mb-2 p-3">

                                <div className="media" dir="rtl">
                                    <img className="ml-3" src={avatar} alt="avatar" />
                                        <div className="media-body text-right">
                                            <p className="userName">{userInfo.name}</p>
                                            <span className="userRole">مستخدم كرز</span>
                                        </div>
                                </div>





                                <hr/>

                                <div className="form-group custom-form-group">
                                    <label className="custom-checkbox text-right" htmlFor="option1">
                                        <span className="mainLabel">تأكيد عن طريق الهاتف</span>
                                        <p className="labelValue">+970597653415</p>
                                        <input type="radio" className="default-check" name="confirm" id="option1"
                                            checked={selectedOption === "phone"} onChange={this.handleChange} value="phone"
                                        />
                                        <span className="customRadio"></span>
                                    </label>
                                </div>

                                <hr/>

                                <div className="form-group custom-form-group">
                                    <label className="custom-checkbox text-right" htmlFor="option2">
                                        <span className="mainLabel">تأكيد عن طريق الإيميل</span>
                                        <p className="labelValue">{email}</p>
                                        <input type="radio" className="default-check" name="confirm" id="option2"
                                               checked={selectedOption === "email"} onChange={this.handleChange} value="email"
                                        />
                                        <span className="customRadio"></span>
                                    </label>
                                </div>

                             </div>

                            <div className="choices mt-4">
                                <button type="submit" className="btn btn-custom btn-login">الإستمرار</button>
                                <Link to='/login' className="btn btn-custom btn-gray mb-4">إدخال كلمة السر لتسجيل الدخول</Link>
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

export default ConfirmOptions;