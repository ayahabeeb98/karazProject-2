import React from 'react';
import {HorizontalBar, Doughnut , Line} from 'react-chartjs-2';

const HorizontalBarData = {
    labels: ['Gaza City', 'Khan Yunis', 'Rafah', 'Deir Al Balah', 'Beit Hanoun', 'Jabalia'],
    datasets: [
        {
            label: '',
            backgroundColor: 'rgba(7,170,50,0.47)',
            hoverBackgroundColor: '#07AA32',
            data: [80, 65, 45, 35, 25, 20, 15]
        }
    ]
};

const HorizontalBarOptions = {
    scales: {
        xAxes: [{
            gridLines: {
                drawOnChartArea: false
            },

        }]
    }
    ,
    legend: {
        display: false
    }
};

const DoughnutData = {
    labels: [
        'Phone Number',
        'Facebook',
        'Email',
        'Gmail Account'
    ],
    datasets: [{
        data: [200, 120, 40,80],
        backgroundColor: [
            '#FFCC00',
            '#50C9C9',
            '#FF6666',
            '#AB0056'
        ],
        hoverBackgroundColor: [
            '#FFCC00',
            '#50C9C9',
            '#FF6666',
            '#AB0056'
        ]
    }]
};


const LineData = {
    labels: ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY'],
    datasets: [
        {
            label: '',
            fill: false,
            lineTension: 0.3,
            borderColor: '#707070',
            borderCapStyle: 'round',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: '#DE3163',
            pointBorderWidth: 8,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#FFCC00',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [20, 59, 40, 81, 56, 55, 40]
        }
    ]
};

const chart = () => {
    return (
        <Line data={LineData} />
        )
};

export default chart;