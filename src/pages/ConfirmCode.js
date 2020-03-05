import React from 'react';
import {apple, google} from "../img/img";
import axios from 'axios';

class ConfirmCode extends React.Component{


    constructor(props){
        super(props);
        this.state = {
            code:'',
            id : '',
            email : '',
            errors:{}
        }
    }

    componentWillMount (){

        if(this.props.location.state === undefined) {
            this.props.history.push('/login')
        }else {
            this.setState({
                id : this.props.location.state.id,
                email : this.props.location.state.email,
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            code : e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        const {id,code,errors} = this.state;
        const verifiedCode = {_id : id,random:code};
        axios.post('http://karaz5.herokuapp.com/api/forgetPassword/verifyCode',verifiedCode)
            .then(response => {
               if(response.status === 200) {
                   this.props.history.push({
                       pathname: '/reset-password',
                       state : {id ,code}
                   })
               }else {
                   console.log("not found")
               }
            })
            .catch(error => {
                errors["serverError"] = "الرمز الذي أدخلته غير صحيح";
                this.setState(errors)
            });
    };

    render() {
        const {code,email,errors} = this.state;

        return (
            <div className="col-lg-4 rightSide">
                <div className="box text-center mb-2">

                    <p className="headerText mt-3" style={{fontWeight: 'bold' }}>تأكيد الحساب</p>
                    <p className="subHeader">أدخل الرمز الذي أرسلناه إلى </p>
                    <p className="subHeader">{email}</p>
                    <p className="description">
                         لكي تتمكن من إعادة تعيين كلمة المرور
                    </p>




                    <form action="" className="mainForm" onSubmit={this.handleSubmit}>
                        <div className="choices mt-4">
                            {errors["serverError"] ?
                                <div className="alert alert-danger" role="alert">
                            <span className="errorMsg text-right text-danger">
                                {errors["serverError"]}</span>
                                </div>  : null}
                        <div className="form-group custom-form-group mb-4">
                            <input type="text" placeholder="أدخل الرمز" className="form-control custom-input"
                                   name="code" value={code} onChange={this.handleChange}
                            />

                            { code.length !== 0 ? [
                                    <span className="topLabel full" key="label">رمز التأكيد</span>,
                                    <span className="clear" key="clear" onClick={() => this.setState({code:''})}>
                                            <i className="fas fa-times-circle"></i>
                                    </span>
                                ] :
                                null
                            }
                        </div>

                            <button type="submit" className="btn btn-custom btn-notActive mb-0"
                                disabled={code ? false : "disabled"}>الإستمرار</button>
                        </div>

                            <hr className="line"/>

                        <div className="text-right choices">
                            <p className="">لم تصلني رسالة هاتف</p>
                            <p>أرسل رسالة هاتف مرة أخرى <i className="far fa-paper-plane icons"></i></p>
                            <p className="pb-4">الحصول على الرمز عن طريق الايميل <i className="far fa-envelope icons"></i></p>

                        </div>

                    </form>
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

export default ConfirmCode;