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
                    <label htmlFor="avatar">
                    <img src={profilePic} alt=""/>
                    </label>
                    <input type="file" id="avatar"/>
                </FormGroup>
            </Form>
        </>
    )
};

export default EditProfileInfo;