import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ClassRoomDataService from "../services/classroom.service";

export class AddClassRoomModal extends Component {
    constructor(props) {
        super(props);

        this.state = { snackbaropen: false, snackbarmsg: '' };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    

    snackbarClose = (event) => {
        this.setState({ snackbaropen: false });
    };

    handleSubmit(event) {
        event.preventDefault();

        var data = {
          classroomName: event.target.classroomname.value
        };
        //console.log(data);
        ClassRoomDataService.create(data)
        .then(response => {
            this.setState({
                students: response.data
            });
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
            Add ClassRoom
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="ClassRoomName">
              <Form.Label>ClassRoomName</Form.Label>
              <Form.Control
                type="text"
                name="classroomname"
                required
                placeholder="ClassRoomName"
               />
              </Form.Group>

              <Form.Group>
                  <Button variant="primary" type="submit">
                  Add Class Room
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