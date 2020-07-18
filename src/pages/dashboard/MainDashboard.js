import React, {useEffect, useState} from 'react';
import {
    Card,
    CardTitle,
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row
} from 'reactstrap';
import {activeUsers, newUser, visits} from '../../img/dashboard';
import axios from 'axios';
import {DateAndHour, DefaultDuration,DoughnutChart,HorizontalBarChart,LineChart} from './component';
import * as Sentry from '@sentry/react';


function FallbackComponent() {
    return (
      <div>An error has occured</div>
    )
  }

  
export default function MainDashboard() {

    //Card dropDown List State
    const [VisitsDropdownOpen, setVisitsDropdownOpen] = useState(false);
    const [NewUserDropdownOpen, setNewUserDropdownOpenTwo] = useState(false);
    const [ActiveUserDropdownOpen, setActiveUserDropdownOpen] = useState(false);
    const VisitsToggle = () => setVisitsDropdownOpen(prevState => !prevState);
    const NewUserToggle = () => setNewUserDropdownOpenTwo(prevState => !prevState);
    const ActiveUserToggle = () => setActiveUserDropdownOpen(prevState => !prevState);


    //Timer display when the page is mount
    const [counter, setCounter] = useState(1);
    const [loading, setLoading] = useState(false);

    //Cards data
    const [cardData, setCardData] = React.useState([
        {title: "Visits", duration: DefaultDuration, total: '00', rate: '55'},
        {title: "New Users", duration: DefaultDuration, total: '00', rate: '55'},
        {title: "Active Users", duration: DefaultDuration, total: '00', rate: '55'},
    ]);




    const startTimer = () => {
        setInterval(TimerUp, 5);
    };

    const TimerUp = () => {
        // const rand = Math.floor(Math.random() * 99) + 1;
        setCounter(counter + 1);
    };

    //start timer if the total doesn't have a value yet.
    if (!cardData[1].total) {
        startTimer();
    }

    //Get the card data from API after the component mounted
    useEffect(() => {
        document.title = "Karaz Beauty | Dashboard";
        const reqData = {date: DateAndHour, type: "day"};
        setLoading(true);
        axios.post('https://karaz6.herokuapp.com/api/dashboard/count', reqData)
            .then(response => {
                const pre = Math.round(response.data.precentage * 100) / 100;
                setCardData(prev => prev.map((c, i) => i === 1 ? ({...c, total: response.data.result, rate: pre}) : c));
                setLoading(false);
            })
            .catch(error => {
                console.log(error)
            });

    }, []);

    //Change data if the user click on the dropDown item (day,month,year)
    const changeData = (type) => {
        const reqData = {date: DateAndHour, type};
        setLoading(true);
        let duration = '';
        switch (type) {
            case "month":
            case "year":
                duration = type;
                break;
            default:
                duration = DefaultDuration;
        }

        axios.post('https://karaz6.herokuapp.com/api/dashboard/count2zzz', reqData)
            .then(response => {
                setLoading(false);
                const pre = Math.round(response.data.precentage * 100) / 100;
                setCardData(prev => prev.map((c, i) => i === 1 ? ({
                    total: response.data.result,
                    rate: pre,
                    duration
                }) : c));
            })
           
    };


    return (
        <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
            <Row xs="1" md="3">
                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        <CardTitle className="cardTitle">
                            Visits
                        </CardTitle>
                        <span className="duration">
                            During this month
                        </span>
                        <h3 className="cardNumber mt-1" id="cardNumber">
                            {/*Display the counter if the total still null*/}
                            145k
                        </h3>
                        <p className="description">
                            <span className="rate up">
                                <i className="fa fa-arrow-up"></i>  12.5%
                            </span> Up From Last Month.
                        </p>
                        <p className="targetNumber">425.21 Target Users</p>
                        <span className="cardIcon">
                            <img src={visits} alt="newUser"/>
                        </span>
                    </Card>
                </Col>

                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        {loading? <div className="spinner-border text-danger sp-card" role="status"></div> :null}
                        <CardTitle className="cardTitle">
                            New Users
                        </CardTitle>
                        <span className="duration">
                            During this {cardData[1].duration}
                        </span>
                        <h3 className="cardNumber mt-1">
                            {/*Display the counter if the total still null*/}
                            {!cardData[1].total ? counter : cardData[1].total}
                        </h3>
                        <p className="description">
                            <span className={cardData[1].rate <= 0 ? "rate down" : "rate up"}>
                                {cardData[1].rate <= 0 ?
                                    <span>
                                        <i className="fa fa-arrow-down"></i>
                                        {Math.abs(cardData[1].rate)}%
                                    </span>
                                    : <span>
                                        <i className="fa fa-arrow-up"></i>
                                        {Math.abs(cardData[1].rate)}%
                                    </span>}
                            </span>
                            {cardData[1].rate <= 0 ? " Down" : " Up"} From Last {cardData[1].duration}.
                        </p>

                        <p className="targetNumber">1254 Target Users</p>
                        <span className="cardIcon">
                            <img src={newUser} alt="newUser"/>
                        </span>
                    </Card>


                    <Dropdown isOpen={NewUserDropdownOpen} className="cardMenu" toggle={NewUserToggle}>
                        <DropdownToggle tag="a">
                            <i className="fa fa-ellipsis-v"></i>
                        </DropdownToggle>
                        <DropdownMenu right className="p-0">
                            <DropdownItem onClick={() => changeData("day")}>Today</DropdownItem>
                            <DropdownItem onClick={() => changeData("month")}>Current month</DropdownItem>
                            <DropdownItem onClick={() => changeData("year")}>Current year</DropdownItem>
                            <DropdownItem>Calender</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>

                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        <CardTitle className="cardTitle">
                            Active Users
                        </CardTitle>
                        <span className="duration">
                            During this {cardData[2].duration}
                        </span>
                        <h3 className="cardNumber mt-1">
                            {/*Display the counter if the total still null*/}
                            {!cardData[2].total ? counter : cardData[2].total}
                        </h3>
                        <p className="description">
                            <span className="rate down">
                                <i className="fa fa-arrow-down"></i>    3.5%
                            </span> Up From Last Month.
                        </p>

                        <p className="targetNumber">1254 Target Users</p>

                        <span className="cardIcon">
                            <img src={activeUsers} alt="newUser"/>
                        </span>
                    </Card>
                </Col>
            </Row>


            {/*Charts Components*/}
            <Row xs="1" lg="2" className="my-3">
                <HorizontalBarChart/>
                <DoughnutChart/>
            </Row>

            <Row xs="1">
                <LineChart/>
            </Row>
            </Sentry.ErrorBoundary>
    )
}