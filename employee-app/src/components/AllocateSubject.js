import React, { Component } from 'react';
import { Table, Form } from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddSubjectModal } from './AddSubjectModal';
import { EditSubjectModal } from './EditSubjectModal';
import SubjectDataService from "../services/subject.service";
import TeacherDataService from "../services/teacher.service";
import AllocateSubjectDataService from "../services/allocatesubject.service";

export default class AllocateSubject extends Component {

    constructor(props) {
        super(props);
        this.state = { subjects: [], addModalShow: false, editModalShow: false, existingTeacherList: [], existingSubjectList: [] }
        this.getTeacherNameList();
        this.changeTeacherName = this.changeTeacherName.bind(this);
        this.getSubjectList();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        //this.refreshList();
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

    getTeacherNameList() {
        TeacherDataService.getAll()
            .then(response => {
                this.setState({
                    existingTeacherList: response.data
                });
                //console.log("existingTeacherList "+response.data[0].teacherID);
                this.getAllocatedSubjectList(response.data[0].teacherID);
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteAllocateSubjectDataService(subjectID) {
        if (window.confirm('Are you sure?')) {
            AllocateSubjectDataService.delete(subjectID)
                .then(response => {
                    this.setState({
                        //subjects: response.data
                    });
                    this.getTeacherNameList();
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
        this.getAllocatedSubjectList(selectedTeacherID);
    }

    getAllocatedSubjectList(selectedTeacherID) {
        AllocateSubjectDataService.get(selectedTeacherID)
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

    getSubjectList() {
        SubjectDataService.getAll()
            .then(response => {
                this.setState({
                    existingSubjectList: response.data

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
          subjectID: parseInt(document.getElementById("subjectList").value),
          teacherID: parseInt(document.getElementById("teacherList").value)
        };
        console.log("subjectID "+data.subjectID);
        console.log("teacherID "+data.teacherID);
        AllocateSubjectDataService.create(data)
          .then(response => {
            this.setState({
              teachers: response.data
            });
            //this.getSubjectList();
            this.getAllocatedSubjectList(data.teacherID);
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }

    render() {

        const { subjects, subjectid, subjectname } = this.state;
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
                    <Form.Label>Subject</Form.Label>
                    <br></br>
                    <select aria-label="Default select example" name="subjectList" id="subjectList" >
                        {this.state.existingSubjectList.map((item) => (
                            <option key={item.subjectID} onClick={() => {
                                this.setState(
                                    {
                                        subjectID: item.subjectID,
                                        subjectName: item.subjectName,
                                        allocateSubjectID: item.allocateSubjectID
                                    }
                                );
                            }} value={item.subjectID}>
                                 {item.subjectName}
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
                            <th>Allowcated subjectID</th>
                            <th>subjectID</th>
                            <th>Subject Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map(subjects =>
                            <tr key={subjects.allocateSubjectID}>
                                <td>{subjects.allocateSubjectID}</td>
                                <td>{subjects.subjectID}</td>
                                <td>{subjects.subjectName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className="mr-2" variant="info"
                                            onClick={() => this.setState({ editModalShow: true, subjectid: subjects.subjectID, subjectname: subjects.subjectName })}
                                        >
                                            Edit
                                        </Button>

                                        <Button className="mr-2"
                                            onClick={() => this.deleteAllocateSubjectDataService(subjects.allocateSubjectID)}
                                            variant="danger"
                                        >Delete</Button>

                                        <EditSubjectModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            subjectid={subjectid}
                                            subjectname={subjectname}
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