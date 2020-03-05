    import React from 'react';
    import {apple, facebbok, gmail, google, logo} from "../img/img";
    import {Link} from "react-router-dom";
    import axios from 'axios';
    import Cookies from "universal-cookie";
    import {checkAuthorizedUser} from "../component/Validator";

    class Login extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                phone: '',
                password: '',
                errors: {},
                togglePass: true,
                loading: false
            }
        }

        componentWillMount() {
            checkAuthorizedUser(this.props,"/login");
        }

        passwordToggle = () => {
            this.setState({
                togglePass: !this.state.togglePass
            })
        };

        //Clear Field
        clearField = (attr) => {
            this.setState({
                [attr]: ''
            })
        };


        handleChange = (e) => {
            this.setState({
                [e.target.name]: e.target.value
            })
        };


        handleSubmit = (e) => {
            const {password , phone ,errors} = this.state;
            const cookie = new Cookies();
            e.preventDefault();
            const user = {password};
            if (phone.includes("@")) {
                user.email = phone;
            }else {
                user.phone = phone;
            }

            this.setState({loading: true});


            axios.post('http://karaz5.herokuapp.com/api/user/login',user)
                .then(Response => {
                    if (Response.status === 200) { //store token if he logged in
                            cookie.set('token', Response.data.token, { path: '/' });
                            const token = cookie.get('token');
                            const config = {
                                headers: { Authorization: `Bearer ${token}` }
                            };

                            axios.get('http://karaz5.herokuapp.com/api/user/profile',config)
                            .then(response => {
                                if(response.status === 200) { //if he verified his account redirect to profile
                                    this.props.history.push('/profile');
                                }else if(response.status === 201) { //authorized but not verified
                                    this.props.history.push('/verify-account');
                                }
                            }).catch(error => {
                                console.log('error',error)
                            })
                    } else {
                        this.setState({loading: false});
                        throw new Error('Something went wrong ...');
                    }
                })
                .catch(error => {
                   errors["serverError"] = "يُرجى التأكد من البيانات المدخلة والمحاولة مجددًا.";
                    this.setState({loading: false, errors});

                });

        };

        render() {
            const {phone, password, togglePass, loading, errors} = this.state;

            return (

                <div className="col-lg-4 rightSide">

                    <div className="box text-center mb-2">
                        <img src={logo} alt="logo" className="box-logo mb-0"/>
                        <p className="headerText noselect">تسجيل دخول بواسطة</p>

                        <div className="choices mb-4">

                            <div className="apps">
                                <a href="https://karaz12.herokuapp.com/auth/facebook" className="btn LoginApp text-secondary"><img src={facebbok} alt="facebook"/>  <span className="social">Facebook</span></a>
                                <a href="http://karaz5.herokuapp.com/api/user/google" className="btn LoginApp text-secondary"><img src={gmail} alt="gmail"/>  <span className="social">Google</span></a>
                            </div>


                            <span className='or noselect'>أو</span>

                            {/***** Login Form *****/}


                            {errors["serverError"] ?
                                <div className="alert alert-danger px-1" role="alert">
                                <span className="errorMsg text-right text-danger">
                                    {errors["serverError"]}</span>
                                </div>  : null}

                            <form action="" className="mainForm" onSubmit={this.handleSubmit}>
                                <div className="form-group custom-form-group">
                                    <input type="text" placeholder="رقم الهاتف أو الإيميل"
                                           className="form-control custom-input"
                                           value={phone} onChange={this.handleChange} name="phone"
                                    />
                                    {phone.length !== 0 ?
                                        [
                                            <span className="topLabel full" key="label">رقم الهاتف أو الايميل</span>,
                                            <span className="clear" key="clear" onClick={() => this.clearField("phone")}>
                                                <i className="fas fa-times-circle"></i>
                                            </span>
                                        ]
                                        : null}
                                </div>


                                <div className="form-group custom-form-group">
                                    <input type={togglePass ? "password" : "text"}
                                           placeholder="كلمة المرور" className="form-control custom-input"
                                           name="password" value={password} onChange={this.handleChange}
                                    />
                                    {password.length !== 0 ?
                                        [
                                            <span className="topLabel full" key="name">كلمة المرور</span>,
                                            <span className="clearPassword" key="clear"
                                                  onClick={() => this.clearField("password")}>
                                            <i className="fas fa-times-circle"></i>
                                            </span>,
                                            <span className="togglePassword" key="3" style={{top: "20%"}}
                                                  onClick={this.passwordToggle}>
                                            {togglePass ? "إظهار" : "إخفاء"}
                                        </span>
                                        ]
                                        : null}
                                </div>

                                <button type="submit" className="btn btn-custom btn-notActive"
                                        disabled={phone && password && !loading ? false : "disabled"}>
                                    {loading ? <i className="fas fa-spinner loadingIcon"></i> : "تسجيل الدخول"}
                                </button>

                            </form>
                            <Link to="/recover" className="btn"> نسيت كلمة المرور </Link>
                        </div>
                    </div>


                    <div className="d-flex">
                           <span className="text-center w-100 ">
                               <Link to='/signup' className="btn">إنشاء حساب</Link>لا يوجد لديك حساب؟
                           </span>
                    </div>


                    <div className="discover text-center">
                        <p>احصل على التطبيق</p>
                        <img src={apple} className="app mr-2" alt="apple store"/>
                        <img src={google} className="app" alt="play store"/>
                    </div>

                </div>


            )
        }
    }

    export default Login;



