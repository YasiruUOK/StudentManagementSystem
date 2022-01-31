import React, { Component } from 'react';
import {Table} from 'react-bootstrap';

import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddClassRoomModal} from './AddClassRoomModal';
import {EditClassRoomModal} from './EditClassroomModal';
import ClassRoomDataService from "../services/classroom.service";


export default class ClassRoom extends Component {

    constructor(props) {
        super(props);
        this.state = { classrooms: [], addModalShow: false, editModalShow: false }
        this.refreshList();
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        ClassRoomDataService.getAll()
        .then(response => {
            this.setState({
                classrooms: response.data
                
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

    deleteClassRoom(classroomID) {
        if (window.confirm('Are you sure?')) {
            ClassRoomDataService.delete(classroomID)
        .then(response => {
            this.setState({
                //classrooms: response.data
            });
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
        }
    }
    render(){
        
        const {classrooms, classroomid, classroomname} = this.state;
        let addModalClose =() => {this.setState({addModalShow:false})
        this.refreshList();
        };
        let editModalClose =() => {this.setState({editModalShow:false})
        this.refreshList();    
        };
    
            return(
                <div>
                <Table className="mt-4" striped bordered hover size="sm">
                <thead>
                    <tr>
                        {/* <th>classroomID</th> */}
                        <th>Classroom Name</th>
                    </tr>
                </thead>
                <tbody>
                    {classrooms.map(classrooms=>
                       <tr key ={classrooms.classroomID}>
                        {/* <td>{classrooms.classroomID}</td>  */}
                        <td>{classrooms.classroomName}</td>
                       <td>
    <ButtonToolbar>
    <Button
    className="mr-2" variant="info"
    onClick= {()=> this.setState({editModalShow:true, classroomid:classrooms.classroomID, classroomname:classrooms.classroomName})}
    >
        Edit
    </Button>
    
    <Button className="mr-2" 
    onClick={()=> this.deleteClassRoom(classrooms.classroomID)} 
    variant="danger"
    >Delete</Button>
    
    <EditClassRoomModal
    show = {this.state.editModalShow}
    onHide={editModalClose}
    classroomid = {classroomid}
    classroomname = {classroomname}
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
        >Add ClassRoom</Button>
    
        <AddClassRoomModal
        show={this.state.addModalShow}
        onHide={addModalClose}
        />
    
    </ButtonToolbar>
    </div>
            )
        }
    
    }