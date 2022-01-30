import React from 'react';
import './App.css';

import {Home} from './components/Home'
import {Department} from './components/Department'
import {Employee} from './components/Employee'
import {Navigation} from './components/Navigation'



import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Student from './components/Student';
import ClassRoom from './components/ClassRoom';
import Teacher from './components/Teacher';
import Subject from './components/Subject';
import AllocateSubject from './components/AllocateSubject';
import AllocateClassRoom from './components/AllocateClassRoom';
import StudentdetailReport from './components/StudentdetailReport';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
      
      <h3 className="m-3 d-flex justify-content-center">
      React JS with Web api Demo</h3>
      <h5 className="m-3 d-flex justify-content-center">
      Employee Management Portal</h5>

      <Navigation/>

      <Switch>
      <Route path='/' component={Home} exact />
      <Route path='/department' component={Department}/>
      <Route path='/employee' component={Employee}/>
      <Route path='/student' component={Student}/>
      <Route path='/classroom' component={ClassRoom}/>
      <Route path='/teacher' component={Teacher}/>
      <Route path='/subject' component={Subject}/>
      <Route path='/allocatesubject' component={AllocateSubject}/>
      <Route path='/allocateclassroom' component={AllocateClassRoom}/>
      <Route path='/studentdetailreport' component={StudentdetailReport}/>
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
