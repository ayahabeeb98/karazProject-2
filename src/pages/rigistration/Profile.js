import React from 'react';
import {verify} from "../../img";
import {Redirect} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie/lib";


class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            verified:false,
            userName: null,
            removed: false,
            cookie: new Cookies()
        }
    }


    componentDidMount() {
        const {cookie} = this.state;
        const token = cookie.get('token');
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        };

        axios.get('https://karaz6.herokuapp.com/api/user/profile', config)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        verified: true,
                        userName: response.data.user.name
                    })
                }else {

                }
            }).catch(error => {
            console.log("profile error", error)
        })
    }

    logout = () => {
        const {cookie} = this.state;
        cookie.remove("token", {path: '/'});
        this.setState({removed: true})
    };

    render() {
        const {verified,userName, removed} = this.state;
        if(!verified) {return null}
        return (
            <>

                <h3 className="headerText mt-3">{userName}</h3>
                <p className="headerText " style={{fontWeight: 'bold'}}>أهلا وسهلا بكِ في تطبيق كرز بيوتي</p>
                <p className="subHeader">تم تأكيد الحساب</p>
                <p className="description">يمكنك الأن التمتع بخدماتنا</p>

                <img src={verify} alt="girl"/>
                <div className="choices">
                    {!removed ?
                        <button className="btn btn-custom btn-login" onClick={this.logout}>تسجيل الخروج</button>
                        :
                        <Redirect to="/"/>
                    }
                </div>


            </>
        );
    }

}

export default Profile;