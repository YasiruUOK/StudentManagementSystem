import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SubjectDataService from "../services/subject.service";

export class AddSubjectModal extends Component {
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
          subjectName: event.target.subjectname.value
        };
        //console.log(data);
        SubjectDataService.create(data)
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
            Add Subject
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="SubjectName">
              <Form.Label>SubjectName</Form.Label>
              <Form.Control
                type="text"
                name="subjectname"
                required
                placeholder="SubjectName"
               />
              </Form.Group>

              <Form.Group>
                  <Button variant="primary" type="submit">
                  Add Subject
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