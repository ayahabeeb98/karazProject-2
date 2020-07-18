import React, {useEffect, useState} from 'react';
import {Form,FormGroup} from 'reactstrap';
import {profilePic} from "../../img";
import Cookies from "universal-cookie/lib";
import axios from "axios";
import {Validator} from "../../components/Functionality";

const EditProfileInfo = () => {
    const [staticName,setStaticName] = useState('userName');
    const [userName , setUserName] = useState('name');
    const [userEmail,setUserEmail] = useState('example@gmail.com');
    const [userPhone,setUserPhone] = useState('00000000000');
    const [errors,setErrors] = useState({});
    //Validate the form before submit
    const validateForm = () => {
        let validEmail = false;
        let validName = Validator("name", userName,
            /^[a-zA-Z\u0600-\u06FF\s]+$/, errors, "الاسم يتكون من أحرف عربية أو انجليزية فقط");

        if (userName.length < 3) {
            validName = false;
            errors["name"] = "الاسم الذي أدخلته قصير للغاية"
        }

        if (userEmail.length !== 0) {
            validEmail = Validator("email", userEmail,
                /[^\d][\w.]+@\w+(\.[A-Za-z]+){1,2}/g, errors, "البريد الالكتروني الذي أدخلته غير صحيح");
        }

        console.log('v',errors);
        setErrors({errors});
        return validName && validEmail;

    };

    useEffect(() => {
        const cookie = new Cookies();
        const token = cookie.get('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        axios.get('https://karaz6.herokuapp.com/api/user/profile', config)
            .then(response => {
                if (response.status === 200) {
                    setStaticName(response.data.user.name);
                    setUserName(response.data.user.name);
                    setUserEmail(response.data.user.email)
                }
            }).catch(error => {
            console.log("profile error", error)
        })
    },[]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (staticName !== userName) {
            if(validateForm()){
                alert('no change');
            }else {

                console.log(errors["name"]);
            }
        }
    };


    return (
        <>
            <h2 className="editHeader">المعلومات الشخصية</h2>
            <hr/>

            <Form onSubmit={handleSubmit}>
                <FormGroup>
                        <span className="ChangeImageWrapper">
                            <p>
                                {staticName}
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
                    <input type="text" id="name" value={userName}
                           onChange={e => setUserName(e.target.value)} placeholder="الاسم كاملا"/>

                    {userName.length !== 0 ?
                            <span className="clear settingClearInput" onClick={() => setUserName('')}>
                             <i className="fa fa-times-circle"></i>
                            </span>
                        : null
                    }

                    <span>{console.log(errors["name"])}</span>

                </FormGroup>

                <FormGroup  className="settingForm">
                    <label htmlFor="email">
                       البريد الإلكتروني
                    </label>
                    <input type="email" id="email" value={userEmail}
                           onChange={e => setUserEmail(e.target.value)} placeholder="البريد الإلكتروني"/>
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