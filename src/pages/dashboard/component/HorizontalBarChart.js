import React, {useEffect, useState} from 'react';
import {Card, CardTitle, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import { HorizontalBar} from "react-chartjs-2";
import axios from "axios";

const initialData = {
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

const options = {
    scales: {
        xAxes: [{
            gridLines: {
                display: false
            },
            ticks: {
                display: false //this will remove only the label
            }
        }],
            yAxes: [{
            gridLines: {
                display: false

            }
        }]
    },
    legend: {
        display: false
    }


};

export const HorizontalBarChart = () => {

    const [barData, setBarData] = useState(initialData);

    useEffect(() => {
        let copy = {...initialData};
        //Get HorizontalBar Data from API
        // axios.get('https://karaz6.herokuapp.com/api/dashboard/sigupType')
        //     .then(response => {
        //         let val = Object.values(response.data);
        //         let data = copy.datasets[0].data;
        //         data = data.map((value, index) => data[index] = Number(val[index]));
        //     })
        //     .catch(error => console.log(error));
    }, []);

    return (
        <>
            <Col className="pr-0">
                <Card className="dashboardCard hor-bar">
                    <CardBody>
                        <CardTitle className="cardTitle">
                            Top Locations
                        </CardTitle>
                        <HorizontalBar data={initialData} options={options} />
                    </CardBody>
                </Card>
            </Col>
        </>
    )
};