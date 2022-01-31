import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddSubjectModal } from './AddSubjectModal';
import { EditSubjectModal } from './EditSubjectModal';
import TeacherDataService from "../services/teacher.service";
import ClassRoomDataService from "../services/classroom.service";
import allocateclassroomService from '../services/allocateclassroom.service';

export default class AllocateClassRoom extends Component {

    constructor(props) {
        super(props);
        this.state = { classrooms: [], addModalShow: false, editModalShow: false, existingTeacherList: [], existingClassRoomList: [] }
        this.getTeacherNameList();
        this.changeTeacherName = this.changeTeacherName.bind(this);
        this.getClassRoomList();
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.refreshList();
    }
    componentDidMount() {
        //this.refreshList();
    }

    refreshList() {
        allocateclassroomService.getAll()
            .then(response => {
                this.setState({
                    classrooms: response.data

                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    componentDidUpdate() {
        //this.refreshList();
    }

    getTeacherNameList() {
        TeacherDataService.getAll()
            .then(response => {
                this.setState({
                    existingTeacherList: response.data
                });
                //console.log("existingTeacherList "+response.data[0].teacherID);
                this.getAllocatedClassRoomList(response.data[0].teacherID);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteAllocateClassroomDataService(classroomID) {
        if (window.confirm('Are you sure?')) {
            allocateclassroomService.delete(classroomID)
                .then(response => {
                    this.setState({
                        //subjects: response.data
                    });
                    var selectedTeacherID = document.getElementById("teacherList").value;
                    this.getAllocatedClassRoomList(selectedTeacherID)
                    //this.getTeacherNameList();
                    //console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    changeTeacherName(event) {
        event.preventDefault();

        var selectedTeacherID = document.getElementById("teacherList").value;
        this.getAllocatedClassRoomList(selectedTeacherID);
    }

    getAllocatedClassRoomList(selectedTeacherID) {
        allocateclassroomService.get(selectedTeacherID)
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

    getClassRoomList() {
        ClassRoomDataService.getAll()
            .then(response => {
                this.setState({
                    existingClassRoomList: response.data

                });
                //console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    handleSubmit(event) {
        event.preventDefault();
        var data = {
          classroomID: parseInt(document.getElementById("classroomList").value),
          teacherID: parseInt(document.getElementById("teacherList").value)
        };
        // console.log("classroomID "+data.classroomID);
        // console.log("teacherID "+data.teacherID);
        allocateclassroomService.create(data)
          .then(response => {
            this.setState({
              teachers: response.data
            });
            //this.getSubjectList();
            this.getAllocatedClassRoomList(data.teacherID);
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

    render() {

        const { classrooms, classroomid, classroomname } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="TeacherName">
                    <Form.Label>Teacher Name</Form.Label>
                    <br></br>
                    <select aria-label="Default select example" name="teacherList" id="teacherList" onChange={this.changeTeacherName}>
                        {this.state.existingTeacherList.map((item) => (
                            <option key={item.teacherID} onClick={() => {
                                this.setState(
                                    {
                                        teacherID: item.teacherID,
                                        firstName: item.firstName,
                                        lastName: item.lastName,
                                        classRoomError: "",
                                    }
                                );
                            }} value={item.teacherID}>
                                {item.firstName} {item.lastName}
                            </option>
                        ))}
                    </select>
                </Form.Group>

                <Form.Group controlId="SubjectName">
                    <Form.Label>Class Room</Form.Label>
                    <br></br>
                    <select aria-label="Default select example" name="classroomList" id="classroomList" >
                        {this.state.existingClassRoomList.map((item) => (
                            <option key={item.classroomID} onClick={() => {
                                this.setState(
                                    {
                                        classroomID: item.classroomID,
                                        classroomName: item.classroomName
                                    }
                                );
                            }} value={item.classroomID}>
                                 {item.classroomName}
                            </option>
                        ))}
                    </select>
                </Form.Group>

                <ButtonToolbar>
                <Button variant="primary" type="submit">Allocate</Button>

                    <AddSubjectModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />

                </ButtonToolbar>

                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>ClassRoom Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classrooms.map(classrooms =>
                            <tr key={classrooms.allocateClassroomID}>
                                <td>{classrooms.classroomName}</td>
                                <td>
                                    <ButtonToolbar>
                                        {/* <Button
                                            className="mr-2" variant="info"
                                            onClick={() => this.setState({ editModalShow: true, classroomid: classrooms.classroomID, classroomname: classrooms.classroomName })}
                                        >
                                            Edit
                                        </Button> */}

                                        <Button className="mr-2"
                                            onClick={() => this.deleteAllocateClassroomDataService(classrooms.allocateClassroomID)}
                                            variant="danger"
                                        >Deallocate</Button>

                                        <EditSubjectModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            classroomid={classroomid}
                                            classroomname={classroomname}
                                        />

                                    </ButtonToolbar>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                </Form>
                
                
            </div>
        )
    }

}