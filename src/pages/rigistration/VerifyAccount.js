import React from 'react';
import {Redirect} from "react-router-dom";
import Cookies from "universal-cookie";
import queryString from "query-string";


class VerifyAccount extends React.Component{
    constructor() {
        super();
        this.state = {
            msg : '',
            userName:null,
            verified : null,
            removed: false,
            cookie : new Cookies()
        }
    }

    componentWillMount() {
        const {cookie} = this.state;
        const token = cookie.get("token");
        if(!token) {this.props.history.push('/login')}
        const query = queryString.parse(this.props.location.search);
        if (query.token) {
            cookie.set("token", query.token , { path: '/' });
        }
    }


    // componentDidMount() {
    //     const {cookie} = this.state;
    //     const token = cookie.get('token');
    //     const config = {
    //         headers: { Authorization: `Bearer ${token}` }
    //     };
    //
    //     console.log(config);
    //     axios.get('http://karaz5.herokuapp.com/api/user/profile',config)
    //         .then(response => {
    //             // if(response.status === 200) {
    //             console.log(response.data);
    //             // }
    //             // this.setState({
    //             //     verified:response.data.user.Account_verified,
    //             //     userName : response.data.user.name
    //             // });
    //         }).catch(error => {
    //             this.props.history.push('/login');
    //     })
    // }

    handleClick = () => {
        const {verified} = this.state;
        if(verified === false) {
            alert("أنت لم تفعّل حسابك بعد")
        }
    };


    logout = () => {
        const {cookie} = this.state;
        cookie.remove("token", { path: '/' });
        this.setState({removed:true})
    };


    render() {
        const {verified, removed  } = this.state;
        return (
            <div>
                {/*check if the user verify his email*/}
                {!verified ?
                    <div>
                        <p className="headerText mt-3" style={{fontWeight: 'bold'}}>تأكيد الحساب</p>
                        <p className="subHeader">
                            أرسلنا لك رابط التفعيل إلى بريدك الإلكتروني
                            يُرجى التحقق منه حتى تتمكن من الدخول لحسابك
                        </p>
                        <div className="choices mt-4">
                            <button onClick={this.handleClick} className="btn btn-custom btn-notActive">الدخول الى الحساب</button>

                            {!removed ?
                                <button  className="btn btn-custom btn-login mb-0" onClick={this.logout}>تسجيل الخروج</button>
                                :
                                <Redirect to="/"/>
                            }
                        </div>

                        <hr className="line"/>

                        <div className="text-right choices">
                            <p className="">لم تصلني رسالة هاتف</p>
                            <p>أرسل رسالة هاتف مرة أخرى <i className="fa fa-paper-plane icons"></i></p>
                            <p className="pb-4">الحصول على الرمز عن طريق الايميل <i className="fa fa-envelope icons"></i></p>
                        </div>

                    </div>
                    :
                    <Redirect to="/profile"/>
                }


            </div>

        );
    }

}

export default VerifyAccount;