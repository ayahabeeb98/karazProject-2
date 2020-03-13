import React from 'react';
import {Form, FormGroup, Input} from 'reactstrap';
import axios from 'axios';

class Recover extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            field : '',
            loading:false,
            errors:{}
        }
    }


     handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const{field , errors} = this.state;
        this.setState({loading:true});
        const account = {};
        if (field.includes('@')) {
            account.email = field
        } else {
            account.phone = field
        }

        if (field.length > 5){

            axios.post('http://karaz5.herokuapp.com/api/forgetPassword/FindAccount',account)
                .then(response => {
                    if(response.status === 200) {
                        this.props.history.push({
                            pathname: '/recover/confirm',
                            state: {
                                userInfo : response.data.user
                            }
                        })
                    }

                })
                .catch( () => {
                    errors["serverError"] = "لم نتمكن من العثور على حسابك باستخدام هذه المعلومات";
                    this.setState({errors,loading:false})
            })

        }else {
            errors["serverError"] = "البيانات التي أدخلتها غير صحيحة";
            this.setState({errors,loading:false})
        }


    };


    render() {
        const {field,loading,errors} = this.state;

        return (
            <div className="choices">
                <p className="headerText">
                    اعثر على حسابك
                </p>


                {/**** display error message if exist *****/}

                {errors["serverError"] ?
                    <div className="alert alert-danger" role="alert">
                    <span className="errorMsg text-right text-danger">
                        {errors["serverError"]}
                    </span>
                    </div> :

                    null}

                <Form className="mainForm" onSubmit={this.handleSubmit}>
                    <FormGroup className="custom-form-group">
                        <Input type="field" name="field" className="custom-input"
                               value={field} onChange={this.handleChange}
                               placeholder="رقم الهاتف أو البريد الإلكتروني"/>

                        {field.length !== 0 ?
                            [
                                <span className="topLabel" key="label">رقم الهاتف أو الايميل</span>,
                                <span className="clear" key="clear" onClick={() => this.setState({field:''})}>
                                <i className="fa fa-times-circle"></i>
                            </span>
                            ]
                            : null}
                    </FormGroup>


                    <FormGroup>
                        <button type="submit" className="btn btn-custom btn-notActive found "
                                disabled={field && !loading ? false : "disabled"}>
                            {loading ? <i className="fa fa-spinner loadingIcon"></i> : "البحث"}
                        </button>
                    </FormGroup>

                </Form>
            </div>
        )
    }
};


export default Recover;