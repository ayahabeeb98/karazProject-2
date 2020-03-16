import React from "react";
import Cookies from "universal-cookie";
import {Route,Redirect} from 'react-router-dom';


export const RouteWrapper = ({component: Component, layout: Layout, ...rest}) => (
    <Route
        {...rest} render={(props) =>
        <Layout {...props}>
            <Component {...props} />
        </Layout>
    }/>
);

export const PrivateRoute = ({ component: Component, layout: Layout , ...options }) => {
    const  cookie = new Cookies();
    const token = cookie.get("token");

    return <Route {...options} render={props=>
        token ?(
                <Layout {...props}>
                    <Component {...props} />
                </Layout>
            ) :
            (<Redirect to="/login"/>)} />;
};