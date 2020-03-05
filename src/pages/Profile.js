import React from 'react';
import { verify} from "../img/img";
import {Redirect} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie/lib";


class Profile extends React.Component{
    constructor() {
        super();
        this.state = {
            msg : '',
            userName:null,
            removed: false,
            cookie : new Cookies()
        }
    }




    componentDidMount() {
        const {cookie} = this.state;
        const token = cookie.get('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        axios.get('http://karaz5.herokuapp.com/api/user/profile',config)
            .then(response => {
                if(response.status === 200) {
                    this.setState({
                        userName : response.data.user.name
                    })
                }else if(response.status === 201) { //authorized but not verified
                    this.props.history.push('/verify-account');
                }
            }).catch(error => {
            console.log("profile error" , error)
        })
    }

    logout = () => {
        const {cookie} = this.state;
        cookie.remove("token", { path: '/' });
        this.setState({removed:true})
    };

    render() {
        const {userName,removed} = this.state;

        return (
            <div className="col-lg-6 mx-auto rightSide">

                <div className="box text-center mb-2">
                    <h3 className="headerText mt-3">{userName}</h3>
                    <p className="headerText " style={{fontWeight: 'bold'}}>أهلا وسهلا بكِ  في تطبيق كرز بيوتي</p>
                    <p className="subHeader">تم تأكيد الحساب</p>
                    <p className="description">يمكنك الأن التمتع بخدماتنا</p>

                    <img src={verify} alt="girl"/>
                    <div className="choices">
                        {!removed ?
                            <button  className="btn btn-custom btn-login" onClick={this.logout}>تسجيل الخروج</button>
                            :
                            <Redirect to="/"/>
                        }
                    </div>
                </div>

            </div>
        );
    }

}

export default Profile;


