import React, {useEffect, useState} from 'react';
import {Card, CardTitle, Col, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {Line} from "react-chartjs-2";
import axios from "axios";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import {DateAndHour, getDates, fromDate, dateStart, fromMonth,dateStartMonth} from './';
import {dateStartYear, fromYear} from "./DefaultDate";

const initialData = {
    labels: ['JAN', 'FEB', 'MAR', 'APRIL', 'MAY', 'JUNE', 'JULY'],
    datasets: [
        {
            label: 'Users ',
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
    const [modal, setModal] = useState(false);
    const [loading,setLoading] = useState(false);

    const [selectedDayRange, setSelectedDayRange] = useState({
        from: null,
        to: null
    });


    const toggle = () => setModal(!modal);

    useEffect(() => {
        //Get HorizontalBar Data from API
        setLoading(true);
        const labels = getDates(fromMonth,"month");
        const reqData = {dateStart:dateStartMonth,dateEnd:DateAndHour,type:"month"};
        let copy = {...initialData,labels};
        axios.post('http://karaz6.herokuapp.com/api/dashboard/chart',reqData)
            .then(response => {
                let val = response.data.results;
                let data = copy.datasets[0].data;
                data = val.map((value, index) => data[index] = Number(val[index]));
                setLineData({...copy});
                setLoading(false)
            })
            .catch(error => console.log(error))

    }, []);

   const handleChangeData  = (type) => {
       setLoading(true);
       let labels = '';
        let startDate = '';
       switch (type) {
           case "day":
               startDate = dateStart;
               labels = getDates(fromDate,type);
               break;
           case "month":
               startDate = dateStartMonth;
               labels = getDates(fromMonth,type);
               break;
           case "year":
               startDate = dateStartYear;
               labels = getDates(fromYear,"year");
               break;
           default:
               labels = ''
       }

       const reqData = {dateStart:startDate,dateEnd:DateAndHour,type};
       let copy = {...initialData,labels};
       axios.post('http://karaz6.herokuapp.com/api/dashboard/chart',reqData)
           .then(response => {
               let val = response.data.results;
               let data = copy.datasets[0].data;
               data = val.map((value, index) => data[index] = Number(val[index]));
               setLineData({...copy});
               setLoading(false)
           })
           .catch(error => console.log(error))
   };

    return (
        <>
            <Col className="pr-0">
                <Card className="dashboardCard">
                    <CardBody>
                        {loading ? <div className="spinner-border text-danger sp" role="status"></div> : null}
                        <CardTitle className="cardTitle line">
                            Registrations Rate
                        </CardTitle>
                        <Nav className="lineChart-menu">
                            <NavItem>
                                <NavLink href="#" className="chart-btn" onClick={()=>handleChangeData("day")}>Daily</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="chart-btn" onClick={()=>handleChangeData("month")}>Monthly</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="chart-btn" onClick={()=>handleChangeData("year")}>Yearly</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="chart-btn" onClick={toggle}>Calender</NavLink>
                            </NavItem>
                        </Nav>

                        <Modal isOpen={modal} toggle={toggle}>
                            <ModalHeader toggle={toggle} className="text-center">
                                Select date
                            </ModalHeader>
                            <ModalBody className="mx-auto">
                                <Calendar
                                    value={selectedDayRange}
                                    onChange={setSelectedDayRange}
                                    shouldHighlightWeekends
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                                <Button color="primary" onClick={toggle}>Apply</Button>
                            </ModalFooter>
                        </Modal>
                        <Line data={lineData}
                              options={options}/>

                    </CardBody>
                </Card>
            </Col>
        </>
    )
};