import React from 'react';
import axios from 'axios';
import {Form,FormGroup,Label} from "reactstrap";
import {avatar} from '../../img';
import {encodeEmail} from "../../components/Functionality";
import {Link} from "react-router-dom";

export default class ConfirmOptions extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedOption: "email",
            userInfo : {},
            allowed : false
        };

    }

    UNSAFE_componentWillMount(){
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
        axios.post('https://karaz6.herokuapp.com/api/forgetPassword/sendEmail',userEmail)
            .then(Response => {
                const id = Response.data.sucess.id;
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
            <>
                <p className="headerText mt-3">تأكيد الحساب</p>
                <p className="subHeader">سوف نرسل لك رمزاً يمكنك إستخدامه
                    لإعادة تعيين كلمة المرور</p>

                <Form className="mainForm" onSubmit={this.handleSubmit}>
                    <div className=" options mb-2 p-3">

                        <div className="media" dir="rtl">
                            <img className="ml-3" src={avatar} alt="avatar" />
                            <div className="media-body text-right">
                                <p className="userName">{userInfo.name}</p>
                                <span className="userRole">مستخدم كرز</span>
                            </div>
                        </div>

                        <hr/>

                        <FormGroup className="custom-form-group">
                            <Label className="custom-checkbox text-right" htmlFor="option1">
                                <span className="mainLabel">تأكيد عن طريق الهاتف</span>
                                <p className="labelValue">+970597653415</p>
                                <input type="radio" className="default-check" name="confirm" id="option1"
                                       checked={selectedOption === "phone"} onChange={this.handleChange} value="phone"
                                />
                                <span className="customRadio"></span>
                            </Label>
                        </FormGroup>

                        <hr/>

                        <FormGroup className="custom-form-group">
                            <Label className="custom-checkbox text-right" htmlFor="option2">
                                <span className="mainLabel">تأكيد عن طريق الإيميل</span>
                                <p className="labelValue">{email}</p>
                                <input type="radio" className="default-check" name="confirm" id="option2"
                                       checked={selectedOption === "email"} onChange={this.handleChange} value="email"
                                />
                                <span className="customRadio"></span>
                            </Label>
                        </FormGroup>

                    </div>

                    <div className="choices mt-4">
                        <button type="submit" className="btn btn-custom btn-login mb-3">الإستمرار</button>
                        <Link to='/login' className="btn btn-custom btn-gray mb-4">إدخال كلمة السر لتسجيل الدخول</Link>
                    </div>

                </Form>

            </>
        )
    }
}