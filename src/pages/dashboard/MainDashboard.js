import React,{useState , useEffect} from 'react';
import {Card, CardTitle, Col, DropdownItem, DropdownMenu,Dropdown, DropdownToggle, Row} from 'reactstrap';
import {activeUsers, newUser, visits} from '../../img/dashboard';
import {HorizontalBar, Doughnut , Line} from 'react-chartjs-2';
import CardBody from "reactstrap/es/CardBody";
import axios from 'axios';

const data = {
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


const DropDownList = (props) => {
    return (
        <Dropdown isOpen={props.isOpen} className="cardMenu" toggle={props.toggle}>
            <DropdownToggle tag="a">
                <i className="fa fa-ellipsis-v"></i>
            </DropdownToggle>
            <DropdownMenu right className="p-0">
                <DropdownItem onClick={props.onClick}>Last day</DropdownItem>
                <DropdownItem>Current month</DropdownItem>
                <DropdownItem>Current year</DropdownItem>
                <DropdownItem>Calender</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default function MainDashboard() {
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal.toISOString().slice(0, 19).replace("T", " ");
    const Defaultduration = dateLocal.toISOString().slice(0,10);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenTwo, setDropdownOpenTwo] = useState(false);
    const [dropdownOpenTh, setDropdownOpenTh] = useState(false);
    const [duration,setDuration] = useState(Defaultduration);
    const [total , setTotal] = useState('23.5');
    const [rate,setRate] = useState('17.3%');
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggleTwo = () => setDropdownOpenTwo(prevState => !prevState);
    const toggleTh = () => setDropdownOpenTh(prevState => !prevState);


    useEffect(() => {
        const reqData = {date:str,type:"day"};
        axios.post('https://karaz6.herokuapp.com/api/dashboard/count',reqData)
            .then( response  =>{
                setTotal(response.data.result);
                const pre = Math.round(response.data.precentage * 100)/100;
                setRate(pre);
            })
            .catch(error => {console.log(error)})
    } , []);

    const changeData = (type) => {
        const reqData = {date:str,type};
        switch (type) {
            case "day":
                setDuration(Defaultduration);
                break;
            case "month":
            case "year":
                setDuration(" last " + type);
                break;
            default:
                setDuration(Defaultduration)
        }
        axios.post('https://karaz6.herokuapp.com/api/dashboard/count',reqData)
            .then( response  =>{
                setTotal(response.data.result);
                const pre = Math.round(response.data.precentage * 100)/100;
                setRate(pre);
            })
            .catch(error => {console.log(error)})
    };




    return (
        <div>
            <Row xs="1" md="3">
                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        <CardTitle className="cardTitle">
                            Visits
                        </CardTitle>
                        <span className="duration">Duration</span>
                        <h3 className="cardNumber mt-1" id="cardNumber">17.2k</h3>
                        <p className="description">
                            <span className="rate up">
                                <i className="fa fa-arrow-up"></i>  12.5%
                            </span>  Up From Last Month.
                        </p>
                        <p className="targetNumber">425.21 Target Users</p>
                        <span className="cardIcon">
                            <img src={visits} alt="newUser"/>
                        </span>

                        <DropDownList isOpen = {dropdownOpen} toggle={toggle} />



                    </Card>
                </Col>

                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        <CardTitle className="cardTitle">
                            New Users
                        </CardTitle>
                        <span className="duration">During {duration}</span>
                        <h3 className="cardNumber mt-1">{total}</h3>
                        <p className="description">
                            <span className={rate <= 0 ? "rate down" : "rate up" }>
                                {rate <= 0 ? <i className="fa fa-arrow-down"></i> : <i className="fa fa-arrow-up"></i> } {rate}
                            </span>  Up From Last Month.
                        </p>
                        <p className="targetNumber">1254 Target Users</p>
                        <span className="cardIcon">
                            <img src={newUser} alt="newUser"/>
                        </span>
                    </Card>
                    <Dropdown isOpen={dropdownOpenTwo} className="cardMenu" toggle={toggleTwo}>
                        <DropdownToggle tag="a">
                            <i className="fa fa-ellipsis-v"></i>
                        </DropdownToggle>
                        <DropdownMenu right className="p-0">
                            <DropdownItem onClick={()=>changeData("day")}>Last day</DropdownItem>
                            <DropdownItem onClick={()=>changeData("month")}>Current month</DropdownItem>
                            <DropdownItem onClick={()=>changeData("year")}>Current year</DropdownItem>
                            <DropdownItem>Calender</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>


                </Col>


                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        <CardTitle className="cardTitle">
                            Active Users
                        </CardTitle>
                        <h3 className="cardNumber mt-1">204</h3>
                        <p className="description">
                            <span className="rate down">
                                <i className="fa fa-arrow-down"></i>    3.5%
                            </span>  Up From Last Month.
                        </p>

                        <p className="targetNumber">1254 Target Users</p>

                        <span className="cardIcon">
                            <img src={activeUsers} alt="newUser"/>
                        </span>

                        <DropDownList isOpen = {dropdownOpenTh}  toggle={toggleTh} />

                    </Card>
                </Col>
            </Row>

            <Row xs="1" lg="2" className="my-3">
                <Col className="pr-0">
                    <Card className="dashboardCard">
                        <CardBody>
                            <CardTitle className="cardTitle">
                                Top Locations
                            </CardTitle>
                            <HorizontalBar data={data}

                                           options={{
                                               scales: {
                                                   xAxes: [{
                                                       gridLines: {
                                                           display: false
                                                       },
                                                       ticks: {
                                                           display: false //this will remove only the label
                                                       }
                                                   }],
                                                   yAxes : [{
                                                       gridLines : {
                                                           display: false

                                                       }
                                                   }]
                                               },
                                               legend: {
                                                   display: false
                                               }
                                           }}/>
                        </CardBody>
                    </Card>
                </Col>
                <Col className="pr-0">
                    <Card className="dashboardCard">
                        <CardBody>
                            <CardTitle className="cardTitle">
                                Sign Up Type Traffic
                            </CardTitle>
                            <Doughnut data={DoughnutData}

                                      options={{
                                          legend : {
                                              position: 'right',
                                              align: 'center',

                                          }
                                      }}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <Row xs="1">
                <Col className="pr-0">
                    <Card className="dashboardCard">
                        <CardBody>
                            <Line data={LineData}
                                  options={options}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}