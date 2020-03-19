import React from 'react';
import {Nav, NavItem, NavLink} from "reactstrap";

const LineChartNav = ({handleChange, toggle,active}) => {

    return (
        <Nav className="lineChart-menu">
            <NavItem>
                <NavLink href="#" className={active === 'day' ? "chart-btn active":"chart-btn"} onClick={()=>handleChange("day")}>Daily</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" className={active === 'month' ? "chart-btn active":"chart-btn"} onClick={()=>handleChange("month")}>Monthly</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" className={active === 'year' ? "chart-btn active":"chart-btn"} onClick={()=>handleChange("year")}>Yearly</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" className={active === 'calender' ? "chart-btn active":"chart-btn"} onClick={toggle}>Calender</NavLink>
            </NavItem>
        </Nav>
    )
};

export default LineChartNav;