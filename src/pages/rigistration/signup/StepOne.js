import React, {useContext} from 'react';
import {Form , FormGroup} from 'reactstrap';
import ToggleField from "./ToggleField";
import {UserInfoContext} from "./context/UserInfoContext";
import {Validator} from "../../../components/Functionality";
import axios from 'axios';
import {SocialMediaLogin} from "../SocialMediaLogin";

export default function StepOne(props) {

    const state = useContext(UserInfoContext);
    //Handle Change value and update the state
    const handleChange = e => {
        state.updateInfo(e.target.name, e.target.value);
    };

    //Toggle between email and phone
    const handleToggleClick = () => {
        state.handleToggle("toggleField");
    };

    //Clear Field
    const clearField = (attr) => {
        state.updateInfo(attr, '');
    };

    //Validate the form before submit
    const validateForm = () => {
        const {name, email, phone, errors} = state;
        let validEmail = false;
        let validPhone = false;
        let validName = Validator("name", name,
            /^[a-zA-Z\u0600-\u06FF\s]+$/, errors, "الاسم يتكون من أحرف عربية أو انجليزية فقط");

        if (name.length < 3) {
            validName = false;
            errors["name"] = "الاسم الذي أدخلته قصير للغاية"
        }

        if (email.length !== 0) {
            validEmail = Validator("email", email,
                /[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g, errors, "البريد الالكتروني الذي أدخلته غير صحيح");
        }

        if (phone.length !== 0) {
            validPhone = Validator("phone", phone
                , /[0-9]{10}/, errors, "رقم الهاتف الذي أدخلته غير صحيح");
        }

         state.handleError(errors);
         return validName && (validEmail || validPhone);

    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, phone, errors} = state;
        const user = {};
        if (email.length !== 0) {
            user.email = email
        } else {
            user.phone = phone;
        }

        if (validateForm()) {
            //Disable next button and display loading icon
            state.handleToggle("loading");

            axios.post('https://karaz6.herokuapp.com/api/user/findUser', user)
                .then(response => {
                    if (response.status === 200) {
                        //Reset loading status
                        state.handleToggle("loading");
                        props.history.push('/signup/stepTwo');
                    }
                })
                .catch(() => {
                    state.handleToggle("loading");
                    if (phone.length !== 0) { //Specify whats the field that the user entered and occurred the error
                            errors["serverError"] = "رقم الهاتف الذي أدخلته مستخدم في حساب آخر";
                        } else {
                            errors["serverError"] = "البريد الإلكتروني الذي أدخلته مستخدم في حساب آخر";
                        }
                        state.handleError(errors);

                    }
                );

            state.updateCompleted();
        }
    };

    return (

        <div className="choices mb-4 mt-2">

            <p className="headerText noSelect">إنشاء حساب بواسطة</p>

            <SocialMediaLogin />

            <span className='or noSelect'>أو</span>


            {/***** Signup form *****/}

            {/*Display error message if exist*/}
            {state.errors["serverError"] ?
                <div className="alert alert-danger" role="alert">
                            <span className="errorMsg text-right text-danger">
                                {state.errors["serverError"]}</span>
                </div> : null}

            <Form className="mainForm" onSubmit={handleSubmit}>

                <FormGroup className="custom-form-group">
                    <input type="text" placeholder="الإسم" className="form-control custom-input"
                           name="name" id="name" onChange={handleChange} value={state.name}
                    />

                    {state.name.length !== 0 ?
                        [
                            <span className="topLabel full" key="name">الإسم</span>,
                            <span className="clear" key="clear" onClick={() => clearField("name")}>
                            <i className="fa fa-times-circle"></i>
                            </span>
                        ]
                        : null
                    }

                    <span className="errorMsg">{state.errors["name"]}</span>

                </FormGroup>

                {state.toggleField ?

                    <ToggleField type="text" name="phone" id="phone" placeholder="رقم الهاتف"
                                 child={state.errors["phone"]}
                                 onChange={handleChange} value={state.phone} onClick={handleToggleClick}
                    >
                        استخدام البريد الإلكتروني بدلًا من ذلك
                    </ToggleField>
                    :

                    <ToggleField type="email" name="email" id="email" placeholder="البريد الإلكتروني"
                                 child={state.errors["email"]}
                                 onChange={handleChange} value={state.email} onClick={handleToggleClick}
                    >
                        استخدام رقم الهاتف بدلًا من ذلك
                    </ToggleField>
                }

                <button type="submit" className="btn btn-custom btn-notActive mb-0"
                        id="next" disabled={state.name && (state.email || state.phone) && !state.loading ? false : "disabled"}>
                    {state.loading ? <i className="fa fa-spinner loadingIcon"></i> : "التالي"}
                </button>

            </Form>
        </div>
    )
}