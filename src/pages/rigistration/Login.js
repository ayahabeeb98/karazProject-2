import React from 'react';
import {Link} from "react-router-dom";
import {Form, FormGroup, Input} from 'reactstrap';
import Cookies from "universal-cookie";
import axios from 'axios';
import {SocialMediaLogin} from "./SocialMediaLogin";
import {detectDevice} from "../dashboard/component/DefaultDate";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            field: '',
            password: '',
            errors: {},
            togglePass: true,
            loading: false
        }
    }

    passwordToggle = () => {
        this.setState({
            togglePass: !this.state.togglePass
        })
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {field, password, errors} = this.state;
        const cookie = new Cookies();
        e.preventDefault();
        const user = {password};
        if (field.includes("@")) {
            user.email = field;
        } else {
            user.phone = field;
        }

        this.setState({loading: true});

        axios.post('https://karaz6.herokuapp.com/api/user/login', user)
            .then(Response => {
                if (Response.status === 200) { //store token if he logged in
                    cookie.set('token', Response.data.token, {path: '/'});
                    const token = cookie.get('token');
                    const config = {
                        headers: {Authorization: `Bearer ${token}`}
                    };

                    axios.get('https://karaz6.herokuapp.com/api/user/profile', config)
                        .then(response => {
                            if (response.status === 200) { //if he verified his account redirect to profile
                                this.props.history.push('/profile');
                            } else if (response.status === 201) { //authorized but not verified
                                this.props.history.push('/verify-account');
                            }
                        }).catch(error => {
                        console.log('error', error)
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
        const {field, password, togglePass, errors, loading} = this.state;

        return (
            <>
                <p className="headerText noSelect">تسجيل دخول بواسطة</p>

                <div className="choices mb-4">

                   <SocialMediaLogin />


                    <span className='or noSelect'>أو</span>

                    {/***** Login Form *****/}

                    {errors["serverError"] ?
                        <div className="alert alert-danger px-1" role="alert">
                                <span className="errorMsg text-right text-danger">
                                    {errors["serverError"]}</span>
                        </div> : null
                    }


                    <Form className="mainForm" onSubmit={this.handleSubmit}>
                        <FormGroup className="custom-form-group">
                            <Input type="text" className="custom-input" placeholder="رقم الهاتف أو الإيميل"
                                   name="field" value={field} onChange={this.handleChange}
                            />

                            {field.length !== 0 ?
                                [
                                    <span className="topLabel" key="label">رقم الهاتف أو الايميل</span>,
                                    <span className="clear" key="clear" onClick={() => this.setState({field: ''})}>
                                        <i className="fa fa-times-circle"></i>
                                    </span>
                                ]
                                : null}
                        </FormGroup>

                        <FormGroup className="custom-form-group">
                            <Input type={togglePass ? "password" : "text"}
                                   className="custom-input" placeholder="كلمة المرور"
                                   name="password" value={password} onChange={this.handleChange}
                            />
                            {password.length !== 0 ?
                                [
                                    <span className="topLabel full" key="name">كلمة المرور</span>,
                                    <span className="clearPassword" key="clear"
                                          onClick={() => this.setState({password: ''})}>
                                            <i className="fa fa-times-circle"></i>
                                            </span>,
                                    <span className="togglePassword" key="3" style={{top: "25%"}}
                                          onClick={this.passwordToggle}>
                                            {togglePass ? "إظهار" : "إخفاء"}
                                        </span>
                                ]
                                : null}
                        </FormGroup>

                        <FormGroup>
                            <button type="submit" className="btn btn-custom btn-notActive mb-0"
                                    disabled={field && password && !loading ? false : "disabled"}>
                                {loading ? <i className="fa fa-spinner loadingIcon"></i> : "تسجيل الدخول"}
                            </button>
                        </FormGroup>
                    </Form>

                    <Link to="/recover" className="btn App-link"> نسيت كلمة المرور </Link>

                </div>

            </>

        )
    }
};


