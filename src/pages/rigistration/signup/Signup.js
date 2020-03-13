import React from 'react';
import {Route} from "react-router-dom";
import {UserInfoContext} from "./context/UserInfoContext";
import Steps from "./Steps";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";

class SignUp extends React.Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            checkBox: false,
            errors: {},
            toggleField: true, //toggle between email and phone field
            togglePassword: true, //hide and show password
            completeStepOne: false, //to check if the user complete step 1 before enter step 2
            loading: false, //to display loading icon
            updateCompleted: this.updateCompleted,
            handleError: this.handleError,
            updateInfo: this.updateInfo,
            handleToggle: this.handleToggle,
        };
    }

    // componentWillMount() {
    //     checkAuthorizedUser(this.props, "/signup");
    // }

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


    render() {
        let location = this.props.location.pathname;
        return (
            <UserInfoContext.Provider value={this.state}>

                <p className="headerText noselect">إنشاء حساب</p>
                <ol className="steps">
                    <li className={location === "/signup/stepOne" ? "active" : ''}>1</li>
                    <li className={location === "/signup/stepTwo" ? "active" : ''}>2</li>
                </ol>

                <Route path="/signup" exact component={Steps}/>
                <Route path="/signup/stepOne" component={StepOne}/>
                <Route path="/signup/stepTwo" component={StepTwo}/>


            </UserInfoContext.Provider>
        )

    }


}

export default SignUp;