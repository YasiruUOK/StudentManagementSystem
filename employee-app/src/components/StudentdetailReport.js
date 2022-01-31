import React, { Component } from 'react';
import { Table, Form, Container, Row, Col } from 'react-bootstrap';

import StudentDataService from "../services/student.service";
import SubjectsAndTeachersDetailsOfClassService from "../services/subjectsAndTeachersDetailsOfClass.service";


export default class StudentdetailReport extends Component {

    constructor(props) {
        super(props);
        this.state = { students: [], addModalShow: false, editModalShow: false, existingStudentList: [], existingStudentDetails: [] }
        this.refreshList();
        this.getStudentNameList();
        this.existingStudentDetails = [];
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
                document.getElementById('contactPersonInput').value = response.data[0].contactPerson;
                document.getElementById('classroomInput').value = response.data[0].classroomName;
                document.getElementById('emailAddressInput').value = response.data[0].emailAddress;
                document.getElementById('contactNumberInput').value = response.data[0].contactNo;
                document.getElementById('dobInput').value = response.data[0].dobString;
                // console.log("response.data[0].classroomID " + response.data[0].classroomID);
                setTimeout(() => {  
                    SubjectsAndTeachersDetailsOfClassService.get(response.data[0].classroomID)
                    .then(subjectResponse => {
                        let count = 0;
                        var rowCount = document.getElementById("myTable").rows.length;
                        for (var i = rowCount - 1; i > 0; i--) {
                            document.getElementById("myTable").deleteRow(i);
                        }
                        for (let subjectName in subjectResponse.data) {

                            var table = document.getElementById("myTable");
                            var row = table.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = subjectResponse.data[count].subjectName;
                            cell2.innerHTML = subjectResponse.data[count].teacherName;
                            count++;
                        }

                    })
                    .catch(e => {
                        console.log(e);
                    });
                 }, 500);
                // SubjectsAndTeachersDetailsOfClassService.get(response.data[0].classroomID)
                //     .then(subjectResponse => {
                //         let count = 0;
                //         var rowCount = document.getElementById("myTable").rows.length;
                //         for (var i = rowCount - 1; i > 0; i--) {
                //             document.getElementById("myTable").deleteRow(i);
                //         }
                //         for (let subjectName in subjectResponse.data) {

                //             var table = document.getElementById("myTable");
                //             var row = table.insertRow(1);
                //             var cell1 = row.insertCell(0);
                //             var cell2 = row.insertCell(1);
                //             cell1.innerHTML = subjectResponse.data[count].subjectName;
                //             cell2.innerHTML = subjectResponse.data[count].teacherName;
                //             count++;
                //         }

                //     })
                //     .catch(e => {
                //         console.log(e);
                //     });

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

    getStudentNameList() {
        StudentDataService.getAll()
            .then(response => {
                this.setState({
                    existingStudentList: response.data
                });
                //this.getAllocatedSubjectList(response.data[0].teacherID);
            })
            .catch(e => {
                console.log(e);
            });
    }

    changeStudentName(event) {
        event.preventDefault();

        var selectedStudentID = document.getElementById("studentList").value;

        StudentDataService.get(selectedStudentID)
            .then(response => {
                //this.getSubjectsAndTeachersDetailsOfClass(response.data.classroomID);

                document.getElementById('contactPersonInput').value = response.data.contactPerson;
                document.getElementById('classroomInput').value = response.data.classroomName;
                document.getElementById('emailAddressInput').value = response.data.emailAddress;
                document.getElementById('contactNumberInput').value = response.data.contactNo;
                document.getElementById('dobInput').value = response.data.dobString;
                //this.getSubjectsAndTeachersDetailsOfClass(parseInt(response.data.classroomID));
                SubjectsAndTeachersDetailsOfClassService.get(response.data.classroomID)
                    .then(subjectResponse => {
                        let count = 0;
                        var rowCount = document.getElementById("myTable").rows.length;
                        for (var i = rowCount - 1; i > 0; i--) {
                            document.getElementById("myTable").deleteRow(i);
                        }
                        for (let subjectName in subjectResponse.data) {

                            var table = document.getElementById("myTable");
                            var row = table.insertRow(1);
                            var cell1 = row.insertCell(0);
                            var cell2 = row.insertCell(1);
                            cell1.innerHTML = subjectResponse.data[count].subjectName;
                            cell2.innerHTML = subjectResponse.data[count].teacherName;
                            count++;
                        }

                    })
                    .catch(e => {
                        console.log(e);
                    });
            })
            .catch(e => {
                console.log(e);
            });

    }
    // getSubjectsAndTeachersDetailsOfClass(classroomID) {
    //     SubjectsAndTeachersDetailsOfClassService.get(classroomID)
    //         .then(response => {
    //             //console.log("size "+response.data);
    //             let count = 0;
    //             for (let key in response) {
    //                 count++;
    //             }
    //             console.log(count);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });

    // }

    render() {

        //const { existingSubjectList, subjectName, teacherName } = this.state;

        return (
            <div>

                <Container>
                    <Row>
                        <Col>
                            <Form.Group controlId="StudentName">
                                <Form.Label>Student Name</Form.Label>
                                <br></br>
                                <select aria-label="Default select example" name="studentList" id="studentList" onChange={this.changeStudentName}>
                                    {this.state.existingStudentList.map((item) => (
                                        <option key={item.studentID} onClick={() => {
                                            this.setState(
                                                {
                                                    studentID: item.studentID,
                                                    firstName: item.firstName,
                                                    lastName: item.lastName
                                                }
                                            );
                                            this.firstName = this.state.firstName;
                                        }} value={item.studentID}>
                                            {item.firstName} {item.lastName}
                                        </option>
                                    ))}
                                </select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="StudentName">
                                <Form.Label>Class Room</Form.Label>
                                <br></br>
                                <input type='text' value='' id="classroomInput" readOnly></input>
                            </Form.Group>

                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="StudentName">
                                <Form.Label>Contact Person</Form.Label>
                                <br></br>
                                <input type='text' value='' id="contactPersonInput" readOnly></input>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="StudentName">
                                <Form.Label>Email Address</Form.Label>
                                <br></br>
                                <input type='text' value='' id="emailAddressInput" readOnly></input>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="StudentName">
                                <Form.Label>Contact Number</Form.Label>
                                <br></br>
                                <input type='text' value='' id="contactNumberInput" readOnly></input>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="StudentName">
                                <Form.Label>Bate of Birth</Form.Label>
                                <br></br>
                                <input type='text' value='' id="dobInput" readOnly></input>
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>

                <Table id="myTable" className="mt-4" striped bordered hover size="sm">
                    <tr>
                        <th>Subject</th>
                        <th>Teacher Name</th>
                    </tr>
                   
                </Table>
            </div>
        )
    }

}