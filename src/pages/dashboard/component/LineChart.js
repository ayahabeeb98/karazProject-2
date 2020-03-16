import React, {useEffect, useState} from 'react';
import {Card, CardTitle, Col, Nav, NavItem, NavLink, Row} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {HorizontalBar, Line} from "react-chartjs-2";
import axios from "axios";

const initialData = {
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

const options = {
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

export const LineChart = () => {

    const [lineData, setLineData] = useState(initialData);

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
                <Card className="dashboardCard">
                    <CardBody>
                        <CardTitle className="cardTitle line">
                            Registrations Rate
                        </CardTitle>
                        <Nav className="lineChart-menu">
                            <NavItem>
                                <NavLink href="#" className="chart-btn">Daily</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="chart-btn">Monthly</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="chart-btn">Yearly</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="chart-btn">Calender</NavLink>
                            </NavItem>
                        </Nav>

                        <Line data={initialData}
                              options={options}/>

                    </CardBody>
                </Card>
            </Col>
        </>
    )
};