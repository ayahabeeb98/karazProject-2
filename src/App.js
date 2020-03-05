import React from 'react';
import './App.css';
import {BrowserRouter as Router , Route , Switch , Redirect} from 'react-router-dom';
import StepOne from "./component/StepOne";
import RegisterLayout from "./layouts/RegisterLayout";
import StepTwo from "./component/StepTwo";
import StepThree from "./component/StepThree";
import BaseLayout from "./layouts/BaseLayout";
import Cookies from 'universal-cookie';
import {Home,Login,Recover,ConfirmCode,ConfirmOptions,ResetPassword,LogoutFromOtherDevices,VerifyAccount,Profile} from "./pages/index"

function App() {

  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <RouteWrapper path="/login" component={Login} layout={BaseLayout}/>
          <RouteWrapper path="/recover" exact component={Recover} layout={BaseLayout}/>
          <RouteWrapper path="/recover/confirm" component={ConfirmOptions} layout={BaseLayout}/>
          <RouteWrapper path="/recover/code" component={ConfirmCode} layout={BaseLayout}/>
          <RouteWrapper path="/recover/logout" component={LogoutFromOtherDevices} layout={BaseLayout}/>
          <RouteWrapper path="/reset-password" component={ResetPassword} layout={BaseLayout}/>

            {/*<UserInfoContext.Provider value=''>*/}
              <RouteWrapper path="/signup" exact component={StepOne} layout={RegisterLayout} />
              <RouteWrapper path="/signup/stepOne" component={StepTwo} layout={RegisterLayout} />
              <RouteWrapper path="/signup/stepTwo" component={StepThree} layout={RegisterLayout} />
              <RouteWrapper path="/verify-account" component={VerifyAccount} layout={BaseLayout} />
          {/*</UserInfoContext.Provider>*/}

          <PrivateRoute path="/profile" component={Profile} />
        </Switch>
      </Router>
  );
}




const RouteWrapper = ({component: Component, layout: Layout, ...rest}) => (
    <Route
        {...rest} render={(props) =>
        <Layout {...props}>
            <Component {...props} />
        </Layout>
    }/>
);



const PrivateRoute = ({ component: Component, ...options }) => {
    const  cookie = new Cookies();
    const token = cookie.get("token");

    return <Route {...options} render={props=>
    token ?( <Component {...props} />) : (<Redirect to="/login"/>)} />;
};



export default App;
