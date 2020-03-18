import React, {useEffect, useState} from 'react';
import {Card, CardTitle, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {Doughnut} from "react-chartjs-2";
import axios from "axios";

const initialData = {
    labels: [
        'Email',
        'Phone Number',
        'Gmail Account',
        'Facebook',
    ],
    datasets: [{
        data: [200, 120, 40, 80],
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
const options = {
    legend: {
        position: 'right',
        align: 'center',

    }
};

export const DoughnutChart = () => {

    const [doughnutData, setDoughnutData] = useState({});
    useEffect(() => {
        let copy = {...initialData};
        //Get DoughnutData from API
        axios.get('https://karaz6.herokuapp.com/api/dashboard/sigupType')
            .then(response => {
                let val = Object.values(response.data);
                let data = copy.datasets[0].data;
                data = data.map((value, index) => data[index] = Number(val[index]));
                setDoughnutData({...copy});
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <>
            <Col className="pr-0">
                <Card className="dashboardCard">
                    <CardBody>
                        <CardTitle className="cardTitle">
                            Sign Up Type Traffic
                        </CardTitle>
                        <Doughnut data={doughnutData} options={options}/>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
};