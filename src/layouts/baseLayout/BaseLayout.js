import React from 'react';
import Header from "../../components/baseLayout/Header";
import Footer from "../../components/rigistration/Footer";
import './style.css';

const BaseLayout = ({children}) => {
    return (
        <div id="baseLayout">
            <Header/>

            <main className="pageContent">
                {children}
            </main>

            <Footer/>
        </div>
    )
};


export default BaseLayout;