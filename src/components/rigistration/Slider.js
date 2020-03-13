import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import {img1,img2,img3} from '../../img';

const items = [
    {
        src:img1,
        altText: 'Slide 1',
        caption: 'من ماركات عالمية',
        header: 'أفخم الأجهزة والأدوات',
        key: '1'
    },
    {
        src:img2,
        altText: 'Slide 2',
        caption: 'لا مثيل لها',
        header: 'تمتعي بإطلالة ملكية ساحرة',
        key: '2'
    },
    {
        src:img3,
        altText: 'Slide 3',
        caption: 'ثقة .. خبرة .. كفاءة',
        header: 'أمهر خبيرات التجميل  في مكان واحد',
        key: '3'
    }
];

const Slider = () => <UncontrolledCarousel items={items} controls={false} interval="3000"/>;


export default Slider;