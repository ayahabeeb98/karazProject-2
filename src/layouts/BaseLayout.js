import React from 'react';
import {Slider} from "../component/Slider";
import Footer from "../component/Footer";

class BaseLayout extends React.Component{

    render() {

        return (
            <div className="row mx-0 custom-row">

                {/*** Side Slider ****/}

                <Slider />

                {this.props.children}

                <Footer/>
            </div>
        )
    }
}


export default BaseLayout;


