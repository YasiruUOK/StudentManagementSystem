import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddStudentModal} from './AddStudentModal';
import {EditStudentModal} from './EditStudentModal';
import StudentDataService from "../services/student.service";


export default class Student extends Component {

    constructor(props) {
        super(props);
        this.state = { students: [], addModalShow: false, editModalShow: false }
        this.refreshList();
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        StudentDataService.getAll()
        .then(response => {
            this.setState({
                students: response.data
            });
            //this.refreshList();
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    componentDidUpdate() {
        //this.refreshList();
    }

    deleteStudent(studentID) {
        if (window.confirm('Are you sure?')) {
            StudentDataService.delete(studentID)
        .then(response => {
            this.setState({
                //students: response.data
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }
    }
    render(){
        
        const {students, studentid, firstname, lastname, contactperson, contactno, emailaddress, dobstring} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});
    
            return(
                <div>
                <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>studentID</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>contactPerson</th>
                        <th>contactNo</th>
                        <th>emailAddress</th>
                        <th>dateOfbirth</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(students=>
                       <tr key ={students.studentID}>
                        <td>{students.studentID}</td> 
                        <td>{students.firstName}</td>
                        <td>{students.lastName}</td>
                        <td>{students.contactPerson}</td>
                        <td>{students.contactNo}</td>
                        <td>{students.emailAddress}</td>
                        <td>{students.dobString}</td>
                       <td>
    <ButtonToolbar>
    <Button
    className="mr-2" variant="info"
    onClick= {()=> this.setState({editModalShow:true, studentid:students.studentID, firstname:students.firstName, lastname:students.lastName, contactperson:students.contactPerson, contactno:students.contactNo, emailaddress:students.emailAddress, dobstring:students.dobString})}
    >
        Edit
    </Button>
    
    <Button className="mr-2" 
    onClick={()=> this.deleteStudent(students.studentID)} 
    variant="danger"
    >Delete</Button>
    
    <EditStudentModal
    show = {this.state.editModalShow}
    onHide={editModalClose}
    studentid = {studentid}
    firstname = {firstname}
    lastname={lastname}
    contactperson={contactperson}
    contactno={contactno}
    emailaddress={emailaddress}
    dobstring={dobstring}
    />
    
    </ButtonToolbar>
    
                       </td>
                       </tr>
                       )}
                </tbody>
                </Table>
    <ButtonToolbar>
        <Button
        variant='primary'
        onClick={()=> this.setState({addModalShow: true})} 
        >Add Student</Button>
    
        <AddStudentModal
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
    
    </ButtonToolbar>
    </div>
            )
        }
    
    }