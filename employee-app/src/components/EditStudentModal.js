import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import StudentDataService from "../services/student.service";
import ClassRoomDataService from "../services/classroom.service";

export class EditStudentModal extends Component{

    constructor(props){
        super(props);
        this.state = {snackbaropen: false, snackbarmsg: '', existingClassroomList: []};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getClassRoomList();
    }

    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
      };

      getClassRoomList() {
        ClassRoomDataService.getAll()
          .then(response => {
            this.setState({
              classrooms: response.data,
              existingClassroomList: response.data
            });
          })
          .catch(e => {
            console.log(e);
          });
      }

      handleSubmit(event){
        event.preventDefault();
        var data = {
            studentID:parseInt(event.target.studentid.value),
          firstName: event.target.firstname.value,
                    lastName: event.target.lastname.value,
                    contactPerson: event.target.contactperson.value,
                    contactNo: event.target.contactno.value,
                    emailAddress: event.target.emailaddress.value,
                    dateOfbirth: event.target.dateofbirth.value
        };
        //console.log(data);
        StudentDataService.update(data)
        .then(response => {
            this.setState({
                students: response.data
            });
            alert("Student edited successfully!");
            //console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });

    }


    render(){
        return(
          <div className="container">
<Snackbar 
anchorOrigin={{vertical:'bottom',horizontal:'center'}}
open = {this.state.snackbaropen}
autoHideDuration = {3000}
onClose={this.snackbarClose}

message = {<span id="message-id">{this.state.snackbarmsg}</span>}
action={[
<IconButton
key="close"
arial-label="Close"
color="inherit"
onClick={this.snackbarClose}
>
  x
</IconButton>
]}
/>

            <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Student
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>


              <Form.Group controlId="studentid">
              <Form.Label>StudentID</Form.Label>
              <Form.Control
                type="text"
                name="studentid"
                required
                disabled
                defaultValue = {this.props.studentid}
                placeholder="StudentID"
               />
              </Form.Group>

              <Form.Group controlId="firstName">
              <Form.Label>FirstName</Form.Label>
              <Form.Control
                type="text"
                name="firstname"
                required
                defaultValue = {this.props.firstname}
                placeholder="FirstName"
               />
              </Form.Group>

              <Form.Group controlId="lastName">
              <Form.Label>LastName</Form.Label>
              <Form.Control
                type="text"
                name="lastname"
                required
                defaultValue = {this.props.lastname}
                placeholder="LastName"
               />
              </Form.Group>

              <Form.Group controlId="contactPerson">
              <Form.Label>ContactPerson</Form.Label>
              <Form.Control
                type="text"
                name="contactperson"
                required
                defaultValue = {this.props.contactperson}
                placeholder="ContactPerson"
               />
              </Form.Group>

              <Form.Group controlId="contactNo">
              <Form.Label>ContactNo</Form.Label>
              <Form.Control
                type="number"
                name="contactno"
                required
                defaultValue = {this.props.contactno}
                placeholder="ContactNo"
               />
              </Form.Group>

              <Form.Group controlId="emailAddress">
              <Form.Label>EmailAddress</Form.Label>
              <Form.Control
                type="email"
                name="emailaddress"
                required
                defaultValue = {this.props.emailaddress}
                placeholder="EmailAddress"
               />
              </Form.Group>

              <Form.Group controlId="dateOfbirth">
              <Form.Label>DateOfbirth</Form.Label>
              <Form.Control
                type="date"
                name="dateofbirth"
                required
                defaultValue = {this.props.dobstring}
                placeholder="DateOfbirth"
               />
              </Form.Group>

              {/* <Form.Group controlId="DateOfbirth">
                    <Form.Label>Class Room</Form.Label>
                    <br></br>
                    <select aria-label="Default select example" name="classroom" >
                      {this.state.existingClassroomList.map((item) => (
                        <option key={item.classroomID} onClick={() => {
                          this.setState(
                            {
                              classRoomID: item.classroomID,
                              classRoomName: item.classroomName,
                              classRoomError: "",
                            }
                          );
                        }} value={item.classroomID}> 
                          {item.classroomName}
                        </option>
                      ))}
                    </select>
                  </Form.Group> */}

              <Form.Group>
                  <Button variant="primary" type="submit">
                  Update Student
                  </Button>
              </Form.Group>
              </Form>
              </Col>
          </Row>

         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>

      </div>
        );
    }




}
