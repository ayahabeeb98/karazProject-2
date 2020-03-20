import React, {useEffect, useState} from 'react';
import {Card, CardTitle, Col} from "reactstrap";
import CardBody from "reactstrap/es/CardBody";
import {Line} from "react-chartjs-2";
import axios from "axios";
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar } from "react-modern-calendar-datepicker";
import {DateAndHour, getDates, fromDate, dateStart, fromMonth,dateStartMonth} from './';
import {convertToDate, dateStartYear, fromYear, now} from "./DefaultDate";
import LineChartNav from "./LineChartNav";
import CalenderPopUp from "./CalenderPopUp";

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
    const [active,setActive] = useState('month');

    const from = {
        year: fromDate.getFullYear(),
        month: fromDate.getMonth() + 1,
        day: fromDate.getDate(),
    };

    const to = {
        year: now.getFullYear(),
        month: now.getMonth() + 1,
        day: now.getDate(),
    };


    const [selectedDayRange, setSelectedDayRange] = useState({
        from:from,
        to: to
    });


    const toggle = () => setModal(!modal);

    useEffect(() => {
        //Get HorizontalBar Data from API
        setLoading(true);
        const labels = getDates(fromMonth,"month");
        const reqData = {dateStart:dateStartMonth,dateEnd:DateAndHour,type:"month"};
        let copy = {...initialData,labels};
        axios.post('https://karaz6.herokuapp.com/api/dashboard/chart',reqData)
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
       setActive(type);
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
       axios.post('https://karaz6.herokuapp.com/api/dashboard/chart',reqData)
           .then(response => {
               let val = response.data.results;
               let data = copy.datasets[0].data;
               data = val.map((value, index) => data[index] = Number(val[index]));
               setLineData({...copy});
               setLoading(false)
           })
           .catch(error => console.log(error))
   };

    const handleCalenderChange = () => {
        setModal(!modal);
        setActive('calender');
        setLoading(true);
        const {from,to} =selectedDayRange;
        const dateFrom  = new Date(from.year,from.month - 1,from.day);
        const dateStart = convertToDate(new Date(from.year,from.month - 1,from.day));
        const dateEnd = convertToDate(new Date(to.year,to.month - 1,to.day));
        const monthsInYear = to.year - from.year;
        const interval = (monthsInYear *12) + (to.month - from.month);
        let type = '';

        if (interval === 0 ) {
            type = 'day'
        }else if (interval <= 7){
            type = 'month'
        }else {
            type = 'year'
        }
        let labels = getDates(dateFrom,type);
        const reqDate = {dateStart,dateEnd,type};
        let copy = {...initialData,labels};
        axios.post('https://karaz6.herokuapp.com/api/dashboard/chart',reqDate)
            .then(response=> {
                let val = response.data.results;
                val.shift();
                let data = copy.datasets[0].data;
                data = val.map((value, index) => data[index] = Number(val[index]));
                setLineData({...copy});
                setLoading(false);
            })
            .catch(error =>console.log(error))
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

                        <LineChartNav handleChange={handleChangeData} toggle={toggle} active={active }/>

                        <CalenderPopUp toggle={toggle} modal={modal} handleChange={handleCalenderChange}>
                            <div className="fromTo">
                                <p>from: {selectedDayRange.from.year+'/'+selectedDayRange.from.month+'/'+selectedDayRange.from.day}</p>
                                <p>to: {selectedDayRange.to ? selectedDayRange.to.year +'/'+selectedDayRange.to.month+'/'+selectedDayRange.to.day:
                                    <span style={{color:"rgba(0,0,0,0.3)"}}>0000/00/00</span>}</p>
                            </div>
                            <Calendar
                                value={selectedDayRange}
                                onChange={setSelectedDayRange}
                                colorPrimary="#1976D2"
                                colorPrimaryLight="rgba(25,118,210,0.3)"
                                shouldHighlightWeekends
                            />
                        </CalenderPopUp>

                        <Line data={lineData}  options={options}/>
                    </CardBody>
                </Card>
            </Col>
        </>
    )
};