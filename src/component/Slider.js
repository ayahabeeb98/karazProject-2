import React from 'react';
import {img1, img2, img3} from "../img/img";

export function Slider() {
    return (
        <div className="col-lg-8 px-0 leftSide">
            <div id="carousel" className="carousel slide" data-ride="carousel" data-interval="3000">
                <ol className="carousel-indicators">
                    <li data-target="#carousel" data-slide-to="0" className="active"></li>
                    <li data-target="#carousel" data-slide-to="1"></li>
                    <li data-target="#carousel" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={img2} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <p className="mainText">تمتعي بإطلالة ملكية ساحرة</p>
                            <p className="subText">لا مثيل لها</p>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={img1} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block  min-vh-100">
                            <p className="mainText">أفخم الأجهزة والأدوات</p>
                            <p className="subText">من ماركات عالمية</p>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={img3} className="d-block w-100" alt="..."/>
                        <div className="carousel-caption d-none d-md-block">
                            <p className="mainText">أمهر خبيرات التجميل في مكان واحد</p>
                            <p className="subText">ثقة .. خبرة .. كفاءة</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}