import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import TeacherDataService from "../services/teacher.service";

export class EditTeacherModal extends Component{

    constructor(props){
        super(props);
        this.state = {snackbaropen: false, snackbarmsg: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    snackbarClose = (event) =>{
        this.setState({snackbaropen:false});
      };

      handleSubmit(event){
        event.preventDefault();
        var data = {
            teacherID:parseInt(event.target.teacherid.value),
          firstName: event.target.firstname.value,
                    lastName: event.target.lastname.value,
                    contactNo: event.target.contactno.value,
                    emailAddress: event.target.emailaddress.value
        };
        //console.log(data);
        TeacherDataService.update(data)
        .then(response => {
            this.setState({
                teachers: response.data
            });
            alert("Teacher edited successfully!");
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
            Edit Teacher
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>


              <Form.Group controlId="teacherid">
              <Form.Label>TeacherID</Form.Label>
              <Form.Control
                type="text"
                name="teacherid"
                required
                disabled
                defaultValue = {this.props.teacherid}
                placeholder="TeacherID"
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

              <Form.Group>
                  <Button variant="primary" type="submit">
                  Update Teacher
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
