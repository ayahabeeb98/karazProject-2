import React, {useContext} from 'react';
import {UserInfoContext} from "./context/UserInfoContext";
import {ValidatePassword} from "../../../components/Functionality";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import {Form,FormGroup} from 'reactstrap';

export default function StepTwo(props) {

    const state = useContext(UserInfoContext);

    //check if the user filled all the field in step one
    //if not redirect to the sign up page
    if (!state.completeStepOne){
        return <Redirect to="/signup"/>
    }

    const handlePasswordChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        state.updateInfo(e.target.name,value);
    };

    //Clear Field
    const clearField = (attr) => {
        state.updateInfo(attr,'');
    };

    const checkPassword = () => {
        let {password} = state;
        const passwordLength = document.getElementById("passwordLength");
        const passwordLetter = document.getElementById("letters");
        const passwordNumber = document.getElementById("numbers");
        const passwordSymbols = document.getElementById("symbols");

        let c1 = ValidatePassword(password.length < 6 , passwordLength,password);
        let c2 = ValidatePassword(!password.match(/[a-zA-z]+/) , passwordLetter,password);
        let c3 = ValidatePassword(!password.match(/\d/) , passwordNumber,password);
        let c4 = ValidatePassword(!password.match(/[!@#$%^&*]/) , passwordSymbols,password);

        return c1 & c2 & c3 & c4;
    };


    //Apply the validation when the user start typing
    checkPassword();


    //reset the password condition to the initial state
    const resetPassword = () => {
        const allCondition = document.getElementsByClassName("c");
        if (state.password.length === 0) {
            let a = Array.from(allCondition);
            a.map(e => { return (
                e.classList.remove("failed"),
                    e.classList.remove("success"))
            })
        }

    };

    resetPassword();


    //Hide / show password
    const handleTogglePassword = () => {
        state.handleToggle("togglePassword");
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        const cookie = new Cookies();
        const {name, email ,phone , password} = state;
        const user = {name , password};
        if(email.length !== 0 ){
            user.email = email
        }else{
            user.phone = phone
        }


        if(checkPassword() && state.checkBox) {
            state.handleToggle("loading");

            axios.post('https://karaz6.herokuapp.com/api/user/signup',user)
                .then(Response => {
                    if (Response.status === 200) {
                        cookie.set('token', Response.data.token,{ path: '/' });
                        const token = cookie.get('token');
                        const config = {
                            headers: { Authorization: `Bearer ${token}` }
                        };

                        axios.get('http://karaz6.herokuapp.com/api/verifyAccount/send',config)
                            .then(res => {
                                if (res.status === 200 ){
                                    props.history.push('/verify-account');
                                }
                            })
                            .catch(() => {
                                console.log("error")
                            });

                    }
                })
                .catch(error => {
                    state.handleToggle("loading");
                });

        }

    };



    return (
        <div className="choices">
            <Form  className="mainForm" onSubmit={handleSubmit}>
                <FormGroup className="custom-form-group">
                    <input type={state.togglePassword ? "password" : "text"}
                           placeholder="كلمة المرور" className="form-control custom-input"
                           name="password"  value={state.password} onChange={handlePasswordChange}
                    />

                    {state.password.length !== 0 ? [
                        <span className="topLabel full" key="1"> كلمة المرور</span>,
                        <span className="clearPassword" key="2" onClick={() => clearField("password")}
                            style={{top:"3%"}}
                        >
                            <i className="fa fa-times-circle"></i>
                        </span>,
                        <span className="togglePassword" key="3" onClick={handleTogglePassword}>
                            {state.togglePassword ? "إظهار" : "إخفاء"}
                        </span>
                    ] : null}

                    <ul className="text-right mr-4 conditions" dir="rtl">
                        <li id="passwordLength" className="c">تحتوي علي 6 أحرف على الأقل</li>
                        <li id="letters" className="c">تحتوي ع أحرف صغيرة أو أحرف كبيرة</li>
                        <li id="numbers" className="c">تحتوي على رقم واحد على الأقل </li>
                        <li id="symbols" className="c">تحتوي على رمز واحد على الأقل </li>
                    </ul>

                </FormGroup>


                <FormGroup className="custom-control checkbox-wrapper" dir="rtl">
                    <label htmlFor="accept" className="custom-checkbox" id="checker">
                        <input type="checkbox" name="checkBox" checked={state.checkBox} onChange={handlePasswordChange}
                               className="default-check" id="accept" />
                        <span className="checkmark"></span>
                        أوافق على الشروط و الخصوصية
                    </label>
                </FormGroup>

                <button type="submit" className="btn btn-custom btn-notActive"
                        disabled={checkPassword() && state.checkBox  && !state.loading ? false : "disabled"}>
                    {state.loading ? <i className="fa fa-spinner loadingIcon"></i> : "إنشاء الحساب"}
                </button>

            </Form>

        </div>
    )
}