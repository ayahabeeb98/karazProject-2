import React from 'react';
import {Link} from "react-router-dom";
import Footer from "../component/Footer";
import {Slider} from "../component/Slider";
import {apple, google, logo} from "../img/img";
import {UserInfoContext} from "../context/UserInfoContext";
import {checkAuthorizedUser} from "../component/Validator";

class RegisterLayout extends React.Component {


    componentWillMount() {
        checkAuthorizedUser(this.props, "/signup");
    }

    // To handle onChange event
    updateInfo = (label, value) => {
        this.setState({[label]: value});
    };


    handleToggle = (par) => {
        if (par === "toggleField") {
            this.setState({[par]: !this.state.toggleField})
        } else if (par === "togglePassword") {
            this.setState({[par]: !this.state.togglePassword})
        } else if (par === "loading") {
            this.setState({[par]: !this.state.loading})
        }
    };

    //to store errors in the state
    handleError = (errors) => {
        this.setState({errors});
    };


    //after submit form in step one
    updateCompleted = () => {
        this.setState({
            completeStepOne: true
        })
    };

    state = {
        name: '',
        email: '',
        phone: '',
        password: '',
        checkBox: false,
        errors: {},
        toggleField: true, //toggle between email and phone field
        togglePassword: true, //hide and show password
        completeStepOne: false, //to check if the user complete step 1 before enter step 2
        loading: true, //to display loading icon
        updateCompleted: this.updateCompleted,
        handleError: this.handleError,
        updateInfo: this.updateInfo,
        handleToggle: this.handleToggle,
    };

    render() {
        let location = this.props.location.pathname;
        return (
            <UserInfoContext.Provider value={this.state}>

                <div className="row mx-0 custom-row">

                    {/*** Side Slider ****/}

                    <Slider/>

                    {/*** Form ***/}
                    <div className="col-lg-4 rightSide">

                        <div className="box text-center mb-2">

                            <img src={logo} alt="logo" className="box-logo mb-0"/>
                            <p className="headerText noselect">إنشاء حساب</p>
                            <ol className="steps">
                                <li className={location === "/signup/stepOne" ? "active" : ''}>1</li>
                                <li className={location === "/signup/stepTwo" ? "active" : ''}>2</li>
                            </ol>

                            {this.props.children}

                            {/****** First Step ******/}


                            {/***** Second Step *****/}


                        </div>

                        <div className="d-flex">
                               <span className="text-center w-100 ">
                                   <Link to='/login' className="btn">تسجيل الدخول</Link> لديك حساب؟
                               </span>
                        </div>

                        <div className="discover text-center mt-2">
                            <p>احصل على التطبيق</p>
                            <img src={apple} className="app mr-2" alt="apple store"/>
                            <img src={google} className="app" alt="play store"/>
                        </div>

                    </div>

                    <Footer/>
                </div>
            </UserInfoContext.Provider>
        )

    }


}

export default RegisterLayout;