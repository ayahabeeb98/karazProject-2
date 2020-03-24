import React from 'react';
import {Form,FormGroup} from 'reactstrap';
import {profilePic} from "../../img";

const EditProfileInfo = () => {
    return (
        <>
            <h2 className="editHeader">المعلومات الشخصية</h2>
            <hr/>

            <Form>
                <FormGroup>
                        <span className="ChangeImageWrapper">
                            <p>
                                يمان المغني
                                 <label htmlFor="avatar" className="settingLabel">
                                    <small>تعديل الصورة الشخصية</small>
                                </label>
                            </p>
                            <img src={profilePic} alt=""/>

                        </span>
                    <input type="file" id="avatar"/>
                </FormGroup>


                <FormGroup className="settingForm">
                    <label htmlFor="name">
                        الإسم كاملا
                    </label>
                    <input type="text" id="name" value="يمان المغني" placeholder="الاسم كاملا"/>
                </FormGroup>

                <FormGroup  className="settingForm">
                    <label htmlFor="email">
                       البريد الإلكتروني
                    </label>
                    <input type="email" id="email" value="Karaz@gmail.com" placeholder="البريد الإلكتروني"/>
                </FormGroup>

                <FormGroup  className="settingForm">
                    <label htmlFor="phone">
                        رقم الهاتف
                    </label>
                    <input type="text" id="phone" value="" placeholder="أضف رقم هاتفك"/>
                </FormGroup>

                <FormGroup  className="settingForm">
                    <label htmlFor="city">
                        المدينة
                    </label>
                    <input type="text" id="city" value="غزة" placeholder="المدينة"/>
                </FormGroup>

                <FormGroup  className="settingForm btn-form">
                    <button type="submit" className="btn" >
                        حفظ
                    </button>
                </FormGroup>
            </Form>
        </>
    )
};

export default EditProfileInfo;