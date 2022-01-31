import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import TeacherDataService from "../services/teacher.service";
import 'react-responsive-combo-box/dist/index.css'

export class AddTeacherModal extends Component {
  constructor(props) {
    super(props);

    this.state = { snackbaropen: false, snackbarmsg: '', existingClassroomList: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };


  handleSubmit(event) {
    event.preventDefault();
 
    

    var data = {
      firstName: event.target.FirstName.value,
      lastName: event.target.LastName.value,
      contactNo: event.target.ContactNo.value,
      emailAddress: event.target.EmailAddress.value
    };

    TeacherDataService.create(data)
      .then(response => {
        this.setState({
          teachers: response.data
        });
        alert("Teacher added successfully!");
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
              Add Teacher
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


                  <Form.Group controlId="ContactNo">
                    <Form.Label>ContactNo</Form.Label>
                    <Form.Control
                      type="number"
                      name="ContactNo"
                      required
                      placeholder="ContactNo"
                    />
                  </Form.Group>


                  <Form.Group controlId="EmailAddress">
                    <Form.Label>EmailAddress</Form.Label>
                    <Form.Control
                      type="email"
                      name="EmailAddress"
                      required
                      placeholder="EmailAddress"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Button variant="primary" type="submit">
                      Add Teacher
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