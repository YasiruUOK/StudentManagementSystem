import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddSubjectModal} from './AddSubjectModal';
import {EditSubjectModal} from './EditSubjectModal';
import SubjectDataService from "../services/subject.service";


export default class Subject extends Component {

    constructor(props) {
        super(props);
        this.state = { subjects: [], addModalShow: false, editModalShow: false }
        this.refreshList();
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        SubjectDataService.getAll()
        .then(response => {
            this.setState({
                subjects: response.data
                
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    }

    componentDidUpdate() {
        //this.refreshList();
    }

    deleteSubject(subjectID) {
        if (window.confirm('Are you sure?')) {
            SubjectDataService.delete(subjectID)
        .then(response => {
            this.setState({
                //subjects: response.data
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }
    }
    render(){
        
        const {subjects, subjectid, subjectname} = this.state;
        let addModalClose =() => this.setState({addModalShow:false});
        let editModalClose =() => this.setState({editModalShow:false});
    
            return(
                <div>
                <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>subjectID</th>
                        <th>Subject Name</th>
                    </tr>
                </thead>
                <tbody>
                    {subjects.map(subjects=>
                       <tr key ={subjects.subjectID}>
                        <td>{subjects.subjectID}</td> 
                        <td>{subjects.subjectName}</td>
                       <td>
    <ButtonToolbar>
    <Button
    className="mr-2" variant="info"
    onClick= {()=> this.setState({editModalShow:true, subjectid:subjects.subjectID, subjectname:subjects.subjectName})}
    >
        Edit
    </Button>
    
    <Button className="mr-2" 
    onClick={()=> this.deleteSubject(subjects.subjectID)} 
    variant="danger"
    >Delete</Button>
    
    <EditSubjectModal
    show = {this.state.editModalShow}
    onHide={editModalClose}
    subjectid = {subjectid}
    subjectname = {subjectname}
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
        >Add Subject</Button>
    
        <AddSubjectModal
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
    
    </ButtonToolbar>
    </div>
            )
        }
    
    }