import React from 'react';
import { Breadcrumb, BreadcrumbItem , Button} from 'reactstrap';
import {email , print , exp} from '../../img/dashboard';

export default function Header(props) {
    return (
        <div className="HeaderWrapper">
            <div className="custom-container HeaderSectionsWrapper">
                <div className="left-side">
                    <h1 className="mainHeading"><i className="fa fa-desktop"></i> Dashboard</h1>
                    <Breadcrumb tag="nav" listTag="div">
                        <BreadcrumbItem tag="a" href="#" className="headerLink">
                            Karaz Beauty
                        </BreadcrumbItem>
                        <BreadcrumbItem tag="a" href="#" className="headerLink">
                            Dashboard
                        </BreadcrumbItem>
                        <BreadcrumbItem active tag="span" className="headerLink">
                            Users
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="right-side">
                    <Button  className="headerBtn">
                        <img src={email} alt="mail"/>Email
                    </Button>
                    <Button  className="headerBtn">
                        <img src={print} alt="print"/>print
                    </Button>
                    <Button  className="headerBtn">
                        <img src={exp} alt="export"/>Export
                    </Button>

                </div>
            </div>
        </div>
    )
}
