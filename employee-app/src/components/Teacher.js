import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddTeacherModal} from './AddTeacherModal';
import {EditTeacherModal} from './EditTeacherModal';
import TeacherDataService from "../services/teacher.service";


export default class Teacher extends Component {

    constructor(props) {
        super(props);
        this.state = { teachers: [], addModalShow: false, editModalShow: false }
        this.refreshList();
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        TeacherDataService.getAll()
        .then(response => {
            this.setState({
                teachers: response.data
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

    deleteTeacher(teacherID) {
        if (window.confirm('Are you sure?')) {
            TeacherDataService.delete(teacherID)
        .then(response => {
            this.setState({
                //teachers: response.data
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }
    }
    render(){
        
        const {teachers, teacherid, firstname, lastname, contactno, emailaddress} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});
    
            return(
                <div>
                <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>teacherID</th>
                        <th>firstName</th>
                        <th>lastName</th>
                        <th>contactNo</th>
                        <th>emailAddress</th>
                    </tr>
                </thead>
                <tbody>
                    {teachers.map(teachers=>
                       <tr key ={teachers.teacherID}>
                        <td>{teachers.teacherID}</td> 
                        <td>{teachers.firstName}</td>
                        <td>{teachers.lastName}</td>
                        <td>{teachers.contactNo}</td>
                        <td>{teachers.emailAddress}</td>
                       <td>
    <ButtonToolbar>
    <Button
    className="mr-2" variant="info"
    onClick= {()=> this.setState({editModalShow:true, teacherid:teachers.teacherID, firstname:teachers.firstName, lastname:teachers.lastName, contactno:teachers.contactNo, emailaddress:teachers.emailAddress})}
    >
        Edit
    </Button>
    
    <Button className="mr-2" 
    onClick={()=> this.deleteTeacher(teachers.teacherID)} 
    variant="danger"
    >Delete</Button>
    
    <EditTeacherModal
    show = {this.state.editModalShow}
    onHide={editModalClose}
    teacherid = {teacherid}
    firstname = {firstname}
    lastname={lastname}
    contactno={contactno}
    emailaddress={emailaddress}
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
        >Add Teacher</Button>
    
        <AddTeacherModal
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
    
    </ButtonToolbar>
    </div>
            )
        }
    
    }