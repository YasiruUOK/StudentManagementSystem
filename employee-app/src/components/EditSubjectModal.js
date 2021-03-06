import React, {Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import SubjectDataService from "../services/subject.service";

export class EditSubjectModal extends Component{

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
            subjectid:parseInt(event.target.subjectid.value),
          subjectname: event.target.subjectname.value
        };
        //console.log(data);
        SubjectDataService.update(data)
        .then(response => {
            this.setState({
                subjects: response.data
            });
            alert("Subject edited successfully!");
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
            Edit Subject
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
          
          <Row>
              <Col sm={6}>
              <Form onSubmit={this.handleSubmit}>


              <Form.Group controlId="subjectid">
              <Form.Label>SubjectID</Form.Label>
              <Form.Control
                type="text"
                name="subjectid"
                required
                disabled
                defaultValue = {this.props.subjectid}
                placeholder="SubjectID"
               />
              </Form.Group>

              <Form.Group controlId="subjectName">
              <Form.Label>SubjectName</Form.Label>
              <Form.Control
                type="text"
                name="subjectname"
                required
                defaultValue = {this.props.subjectname}
                placeholder="SubjectName"
               />
              </Form.Group>

              <Form.Group>
                  <Button variant="primary" type="submit">
                  Update Subject
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
