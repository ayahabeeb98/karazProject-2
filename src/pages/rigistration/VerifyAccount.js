import React from 'react';
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
import queryString from "query-string";
import axios from 'axios';

class VerifyAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            msg: '',
            verified: null,
            removed: false,
            cookie: new Cookies()
        }
    }

    UNSAFE_componentWillMount() {
        const {cookie} = this.state;
        const token = cookie.get("token");
        if (!token) {
            this.props.history.push('/login')
        }
        const query = queryString.parse(this.props.location.search);
        if (query.token) {
            cookie.set("token", query.token, {path: '/'});
        }
    }


    componentDidMount() {
        const {cookie} = this.state;
        const token = cookie.get('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        axios.get('http://karaz6.herokuapp.com/api/user/profile', config)
            .then(response => {
                console.log(response);
                if (response.status === 200) { //if he verified his account redirect to profile
                    this.props.history.push('/profile');
                } else if (response.status === 201) { //authorized but not verified
                    this.setState({
                        verified: true,
                    });
                }
            }).catch(error => {
            console.log('error', error)
        });

    }

    handleClick = () => {
        const {verified} = this.state;
        if (verified === false) {
            alert("أنت لم تفعّل حسابك بعد")
        }
    };


    logout = () => {
        const {cookie} = this.state;
        cookie.remove("token", {path: '/'});
        this.setState({removed: true})
    };

    sendEmail = () => {
        const token = this.state.cookie.get('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('https://karaz6.herokuapp.com/api/verifyAccount/send',config)
            .then(res => {
                if (res.status === 200 ){
                   alert("email send successfully")
                }
            })
            .catch(() => {
                console.log("error")
            });

    };

    render() {
        const {verified, removed} = this.state;

        return (
            <div>
                {verified ?
                    <div>
                        <p className="headerText mt-3" style={{fontWeight: 'bold'}}>تأكيد الحساب</p>
                        <p className="subHeader">
                            أرسلنا لك رابط التفعيل إلى بريدك الإلكتروني
                            يُرجى التحقق منه حتى تتمكن من الدخول لحسابك
                        </p>
                        <div className="choices mt-4">
                            <button onClick={this.handleClick} className="btn btn-custom btn-notActive">الدخول الى
                                الحساب
                            </button>

                            {!removed ?
                                <button className="btn btn-custom btn-login mb-0" onClick={this.logout}>تسجيل
                                    الخروج</button>
                                :
                                <Redirect to="/"/>
                            }
                        </div>

                        <hr className="line"/>

                        <div className="text-right choices">
                            <p className="">لم تصلني رسالة هاتف</p>
                            <p>
                                أرسل رسالة هاتف مرة أخرى
                                <i className="fa fa-paper-plane icons"></i>
                            </p>
                            <p className="pb-4" onClick={this.sendEmail} style={{cursor:"pointer"}}>
                                الحصول على الرمز عن طريق الايميل
                                <i className="fa fa-envelope icons"></i>
                            </p>
                        </div>
                    </div>
                    :
                    <span className="loadingWrapper">
                        <i className="fa fa-spinner loadingIcon"></i>
                    </span>
                }
            </div>
        );
    }

}

export default VerifyAccount;