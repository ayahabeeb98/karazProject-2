import React from 'react';
import {apple, google, logo} from "../img/img";
import axios from 'axios';

class Recover extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            email: '',
            errors: {},
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    // validAccount = () => {
    //     const {email , errors} = this.state;
    //     return Validator("email",email, /[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g,
    //         errors, "البريد الالكتروني الذي أدخلته غير صحيح");
    // };


    handleSubmit = (e) => {
        e.preventDefault();
        const{email , errors} = this.state;
        const account = {};
        if (email.includes('@')) {
            account.email = email
        } else {
            account.phone = email
        }

        if (email.length > 5){
            //send email request

            axios.post('http://karaz5.herokuapp.com/api/forgetPassword/FindAccount',account)
                .then(response => {
                    if(response.status === 200) {
                        this.props.history.push({
                            pathname: '/recover/confirm',
                            state: {
                                userInfo : response.data.user
                            }
                        })
                    }else{
                        console.log("not found")
                    }
                }).catch(error => {
                    console.log("error")
            })


        }else {
            errors["email"] = "لم نتمكن من العثور على حسابك باستخدام هذه المعلومات";
            this.setState({errors})
        }
    };

    render() {
        const {email,errors} = this.state;

        return (
            <div className="col-lg-4 rightSide" >
                <div className="box text-center mb-2">
                    <img src={logo} alt="logo" className="box-logo mb-0"/>
                    <p className="headerText">اعثر على حسابك</p>

                    <div className="choices mb-2">
                        {/**** display error message if exist *****/}

                        {errors["email"] ?
                        <div className="alert alert-danger" role="alert">
                            <span className="errorMsg text-right text-danger">
                                {errors["email"]}</span>
                        </div>  : null}

                        <form action="" className="mainForm" onSubmit={this.handleSubmit}>
                            <div className="form-group custom-form-group mb-0">
                                <input type="text" placeholder="رقم الهاتف أو الإيميل" className="form-control custom-input"
                                       name="email" value={email} onChange={this.handleChange} />

                                { email.length !== 0 ?
                                    [
                                        <span className="topLabel full" key="label">رقم الهاتف أو الايميل</span>,
                                        <span className="clear" key="clear" onClick={() => this.setState({"email" : ''})}>
                                            <i className="fas fa-times-circle"></i>
                                        </span>
                                    ]
                                    : null }


                            </div>

                            <button type="submit" className="btn btn-custom btn-notActive found mb-4"
                                    disabled={email ? false : "disabled"}>اعثر على حسابي</button>

                        </form>
                    </div>
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

export default Recover;