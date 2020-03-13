import React, {useContext} from 'react';
import {UserInfoContext} from "./context/UserInfoContext";
import {FormGroup} from 'reactstrap';

export default function ToggleField(props) {

    const state = useContext(UserInfoContext);
    return (
        <FormGroup className="custom-form-group">
            <input type={props.type} placeholder={props.placeholder} className="form-control custom-input"
                   name={props.name} id={props.id} value={props.value} onChange={props.onChange}
            />
            {state.email.length !== 0 || state.phone.length !==0 ?
                [
                    <span className="topLabel full" key={props.id}>{props.id === "email" ? "البريد الإلكتروني" : "رقم الهاتف"} </span>,
                    <span className="clear" key="clearField" onClick={() =>  state.updateInfo(props.name, '')}>
                            <i className="fa fa-times-circle"></i>
                    </span>
                ]
                : null}

            <p className="text-right toggleInput" id="toggleInput-p" onClick={props.onClick}>{props.children}</p>
            <span className="errorMsg">{props.child}</span>

        </FormGroup>
    )
}