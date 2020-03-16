import {facebbok, gmail} from "../../img";
import React from "react";

export const SocialMediaLogin = () => {
 return (

     <div className="apps">

         <a href="http://karaz6.herokuapp.com/api/user/facebook" className="btn LoginApp text-secondary">
             <img src={facebbok} alt="facebook"/>
             <span className="social">Facebook</span>
         </a>
         <a href="http://karaz6.herokuapp.com/api/user/google" className="btn LoginApp text-secondary">
             <img src={gmail} alt="gmail"/>
             <span className="social">Google</span>
         </a>

     </div>
 )
};