import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar, Nav} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
        return(
            <Navbar bg="dark" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>

            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/">Home</NavLink> 

             <NavLink className="d-inline p-2 bg-dark text-white"
            to="/department">Department</NavLink> 

            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/employee">Employee</NavLink> 

            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/student">Student</NavLink> 

            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/classroom">ClassRoom</NavLink> 

            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/teacher">Teacher</NavLink> 
            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/subject">Subject</NavLink> 
            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/allocatesubject">AllocateSubject</NavLink> 
            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/allocateclassroom">AllocateClassRoom</NavLink> 
            <NavLink className="d-inline p-2 bg-dark text-white"
            to="/studentdetailreport">Student Detail Report</NavLink> 

            </Nav>
            </Navbar.Collapse>
            </Navbar>

        )
    }
}
