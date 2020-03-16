import React from 'react';
import {Form,FormGroup} from 'reactstrap';
import Label from "reactstrap/es/Label";

export default class LogoutFromOtherDevices extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedOption: "keepOnLine"
        }
    }

    handleChange = (e) => {
        this.setState({
            selectedOption: e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/reset-password');
    };

    render() {
        const {selectedOption} = this.state;
        return (
            <>
                <p className="headerText mt-3">تسجيل الخروج من الأجهزة الأخرى</p>
                <p className="description">يمكنك تسجيل الخروج من أي جهاز
                    تعتقد أن حسابك فعال فيه</p>

                <Form className="mainForm" onSubmit={this.handleSubmit}>

                    <div className=" options mb-2 p-3">

                        <FormGroup className="custom-form-group mb-0">
                            <Label className="custom-checkbox text-right mb-0" htmlFor="option1">
                                <span className="mainLabel">بقائي متصلًا</span>
                                <input type="radio" className="default-check" name="confirm" id="option1"
                                       checked={selectedOption === "phone"} onChange={this.handleChange} value="phone"
                                />
                                <span className="customRadio"></span>
                            </Label>
                        </FormGroup>

                        <hr/>

                        <FormGroup className="form-group custom-form-group mb-0">
                            <Label className="custom-checkbox text-right mb-0" htmlFor="option2">
                                <span className="mainLabel">خروجي من جميع الأجهزة المتصلة</span>
                                <input type="radio" className="default-check" name="confirm" id="option2"
                                       checked={selectedOption === "email"} onChange={this.handleChange} value="email"
                                />
                                <span className="customRadio"></span>
                            </Label>
                        </FormGroup>

                    </div>

                    <div className="choices mt-4">
                        <button type="submit" className="btn btn-custom btn-login">الإستمرار</button>
                    </div>

                </Form>
            </>

        );
    }

}