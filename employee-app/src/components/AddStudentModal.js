import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import StudentDataService from "../services/student.service";
import ClassRoomDataService from "../services/classroom.service";
import 'react-responsive-combo-box/dist/index.css'

// const ComboBoxExample = () => {
//   ClassRoomDataService.getAll()
//       .then(response => {
//           this.setState({
//               classrooms: response.data

//           });
//           console.log(response.data);
//           //return <ComboBox options={classrooms} enableAutocomplete />
//         })
//         .catch(e => {
//           console.log(e);
//         });
//   //const {classrooms} = this.state;
//   const data = [
//     'America',
//     'India',
//     'Australia',
//     'Argentina',
//     'Ireland',
//     'Indonesia',
//     'Iceland',
//     'Japan'
//   ]
//   // return <ComboBox options={classrooms} enableAutocomplete />
// }

export class AddStudentModal extends Component {
  constructor(props) {
    super(props);

    this.state = { snackbaropen: false, snackbarmsg: '', existingClassroomList: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getClassRoomList();
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
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

  handleSubmit(event) {
    event.preventDefault();
 
    

    var data = {
      firstName: event.target.FirstName.value,
      lastName: event.target.LastName.value,
      contactPerson: event.target.ContactPerson.value,
      contactNo: event.target.ContactNo.value,
      emailAddress: event.target.EmailAddress.value,
      dateOfbirth: event.target.DateOfbirth.value,
      ClassroomID: parseInt(event.target.classroom.value)
    };

    StudentDataService.create(data)
      .then(response => {
        this.setState({
          students: response.data
        });
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="container">
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}

          message={<span id="message-id">{this.state.snackbarmsg}</span>}
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
              Add Student
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>


            <Row>
              <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="FirstName">
                    <Form.Label>FirstName</Form.Label>
                    <Form.Control
                      type="text"
                      name="FirstName"
                      required
                      placeholder="FirstName"
                    />
                  </Form.Group>

                  <Form.Group controlId="LastName">
                    <Form.Label>LastName</Form.Label>
                    <Form.Control
                      type="text"
                      name="LastName"
                      required
                      placeholder="LastName"
                    />
                  </Form.Group>

                  <Form.Group controlId="ContactPerson">
                    <Form.Label>ContactPerson</Form.Label>
                    <Form.Control
                      type="text"
                      name="ContactPerson"
                      required
                      placeholder="ContactPerson"
                    />
                  </Form.Group>


                  <Form.Group controlId="ContactNo">
                    <Form.Label>ContactNo</Form.Label>
                    <Form.Control
                      type="text"
                      name="ContactNo"
                      required
                      placeholder="ContactNo"
                    />
                  </Form.Group>


                  <Form.Group controlId="EmailAddress">
                    <Form.Label>EmailAddress</Form.Label>
                    <Form.Control
                      type="text"
                      name="EmailAddress"
                      required
                      placeholder="EmailAddress"
                    />
                  </Form.Group>


                  <Form.Group controlId="DateOfbirth">
                    <Form.Label>DateOfbirth</Form.Label>
                    <Form.Control
                      type="date"
                      name="DateOfbirth"
                      required
                      placeholder="DateOfbirth"
                    />
                  </Form.Group>


                  <Form.Group controlId="DateOfbirth">
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
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Student
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