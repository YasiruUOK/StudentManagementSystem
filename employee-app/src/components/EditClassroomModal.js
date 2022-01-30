import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import ClassRoomDataService from "../services/classroom.service";

export class EditClassRoomModal extends Component{

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
            classroomid:parseInt(event.target.classroomid.value),
          classroomname: event.target.classroomname.value
        };
        //console.log(data);
        ClassRoomDataService.update(data)
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
            Edit ClassRoom
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>


              <Form.Group controlId="classroomid">
              <Form.Label>ClassRoomID</Form.Label>
              <Form.Control
                type="text"
                name="classroomid"
                required
                disabled
                defaultValue = {this.props.classroomid}
                placeholder="ClassRoomID"
               />
              </Form.Group>

              <Form.Group controlId="classroomName">
              <Form.Label>ClassRoomName</Form.Label>
              <Form.Control
                type="text"
                name="classroomname"
                required
                defaultValue = {this.props.classroomname}
                placeholder="ClassRoomName"
               />
              </Form.Group>

              <Form.Group>
                  <Button variant="primary" type="submit">
                  Update ClassRoom
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
