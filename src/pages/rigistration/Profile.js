import React from 'react';
import {verify} from "../../img";
import {Link} from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie/lib";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            verified:false,
            userName: null,
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


    render() {
        const {verified,userName} = this.state;
        if(!verified) {return (
            <span className="loadingWrapper">
                <i className="fa fa-spinner loadingIcon"></i>
            </span>
        )}
        return (
            <>

                <h3 className="headerText mt-3">{userName}</h3>
                <p className="headerText " style={{fontWeight: 'bold'}}>أهلا وسهلا بكِ في تطبيق كرز بيوتي</p>
                <p className="subHeader">تم تأكيد الحساب</p>
                <p className="description">يمكنك الأن التمتع بخدماتنا</p>

                <img src={verify} alt="girl"/>
                <div className="choices">
                    <Link className="btn btn-custom btn-login" to="/home">الدخول للموقع</Link>
                </div>


            </>
        );
    }

}

export default Profile;