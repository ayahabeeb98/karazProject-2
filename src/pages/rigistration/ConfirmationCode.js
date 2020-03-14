import React from 'react';
import axios from 'axios';
import {Form,FormGroup,Input} from 'reactstrap';

export default class ConfirmationCode extends React.Component{

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
        const verifiedCode = {id : id,random:code};
        console.log(verifiedCode);
        axios.post('https://karaz6.herokuapp.com/api/forgetPassword/verifyCode',verifiedCode)
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
            <div>
                <p className="headerText mt-3" style={{fontWeight: 'bold' }}>تأكيد الحساب</p>
                <p className="subHeader">أدخل الرمز الذي أرسلناه إلى </p>
                <p className="subHeader">{email}</p>
                <p className="description">
                    لكي تتمكن من إعادة تعيين كلمة المرور
                </p>


                <Form className="mainForm" onSubmit={this.handleSubmit}>
                    <div className="choices mt-4">
                        {errors["serverError"] ?
                            <div className="alert alert-danger" role="alert">
                            <span className="errorMsg text-right text-danger">
                                {errors["serverError"]}</span>
                            </div>  : null}

                        <FormGroup className="custom-form-group mb-4">
                            <Input type="text" placeholder="أدخل الرمز" className="custom-input"
                                    name="code" value={code} onChange={this.handleChange}/>
                            { code.length !== 0 ? [
                                    <span className="topLabel full" key="label">رمز التأكيد</span>,
                                    <span className="clear" key="clear" onClick={() => this.setState({code:''})}>
                                            <i className="fa fa-times-circle"></i>
                                    </span>
                                ] :
                                null
                            }
                        </FormGroup>



                        <button type="submit" className="btn btn-custom btn-notActive mb-0"
                                disabled={code ? false : "disabled"}>الإستمرار</button>
                    </div>

                    <hr className="line"/>

                    <div className="text-right choices">
                        <p className="">لم تصلني رسالة هاتف</p>
                        <p>أرسل رسالة هاتف مرة أخرى <i className="fa fa-paper-plane icons"></i></p>
                        <p className="pb-4">الحصول على الرمز عن طريق الايميل <i className="fa fa-envelope icons"></i></p>

                    </div>

                </Form>
            </div>
        )
    }
}
