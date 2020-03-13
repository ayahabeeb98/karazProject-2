import React,{useState} from 'react';
import {Card, CardTitle, Col, DropdownItem, DropdownMenu,Dropdown, DropdownToggle, Row} from 'reactstrap';
import {activeUsers, newUser, visits} from '../../img/dashboard';
import {HorizontalBar, Doughnut , Line} from 'react-chartjs-2';
import CardBody from "reactstrap/es/CardBody";
import UncontrolledCollapse from "reactstrap/es/UncontrolledCollapse";

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
                <DropdownItem>Last week</DropdownItem>
                <DropdownItem>Last month</DropdownItem>
                <DropdownItem>Calender</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
};

export default function MainDashboard() {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpenTwo, setDropdownOpenTwo] = useState(false);
    const [dropdownOpenTh, setDropdownOpenTh] = useState(false);
    const [total , setTotal] = useState('23.5k');
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const toggleTwo = () => setDropdownOpenTwo(prevState => !prevState);
    const toggleTh = () => setDropdownOpenTh(prevState => !prevState);

    const changeData = () => {
        setTotal('200k')
    };


    return (
        <div>
            <Row xs="1" md="3">
                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        <CardTitle className="cardTitle">
                            Visits
                        </CardTitle>

                        <h3 className="cardNumber mt-1" id="cardNumber">{total}</h3>
                        <p className="description">
                            <span className="rate up">
                                <i className="fa fa-arrow-up"></i>  12.5%
                            </span>  Up From Last Month.
                        </p>
                        <p className="targetNumber">425.21 Target Users</p>
                        <span className="cardIcon">
                            <img src={visits} alt="newUser"/>
                        </span>

                        <DropDownList isOpen = {dropdownOpen} onClicl={changeData} toggle={toggle} />



                    </Card>
                </Col>
                <Col className="pr-0">
                    <Card body className="dashboardCard">
                        <CardTitle className="cardTitle">
                            New Users
                        </CardTitle>
                        <h3 className="cardNumber mt-1">238k</h3>
                        <p className="description">
                            <span className="rate up">
                                <i className="fa fa-arrow-up"></i>  30.7%
                            </span>  Up From Last Month.
                        </p>
                        <p className="targetNumber">1254 Target Users</p>
                        <span className="cardIcon">
                            <img src={newUser} alt="newUser"/>
                        </span>
                    </Card>
                    <DropDownList isOpen = {dropdownOpenTwo} onClicl={changeData} toggle={toggleTwo} />

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

                        <DropDownList isOpen = {dropdownOpenTh} onClicl={changeData} toggle={toggleTh} />

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
                                           width={230}
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
                                      width={230}
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