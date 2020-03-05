import React from 'react';

export default function Footer() {
    return (
        <footer className="mainFooter">
            <div className="copyRight">
                <small className="noselect">حقوق النشر محفوظة لدي تطبيق كرز بيوتى</small>
            </div>
            <ul>
                <li><a href="#" className="App-link"> من نحن </a></li>
                <li><a href="#" className="App-link"> مساعدة </a></li>
                <li><a href="#" className="App-link"> الخصوصية </a></li>
                <li><a href="#" className="App-link"> الشروط </a></li>
                <li><a href="#" className="App-link"> اللغات </a></li>
            </ul>
        </footer>
    )
}