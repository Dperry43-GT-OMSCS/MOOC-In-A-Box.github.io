import React, { useState } from 'react';
import './CreateCourse.css';
import {Button} from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from "react-router-dom";
import * as FirebaseService from '../../service/firebase.service';
import CreateCourseDialog from './CreateCourseDialog/CreateCourseDialog.component';


function CreateCourse(props) {
  console.log(props.user);
  const [isCreateCourseDialogOpen, setIsCreateCourseDialogOpen] = useState(false);


function handleCreateCourseDialogClose(){
  setIsCreateCourseDialogOpen(false);
}

function openCreateCourseDialog(){
  setIsCreateCourseDialogOpen(true);

}

function updateUser(user) {
  console.log(user);
}

async function handleSubmit(courseInfo){
  console.log(props.user.id);
  courseInfo.owner = props.user.id;

  courseInfo.chapter = {
    id: 0,
    lessons: "Course/rlfxOavBn4nPZLNTRMkL/Lessons/kL5CwNARpoUhexocK7P4",
    sectionTitle: `${courseInfo.title} - Section`
  }

  const result = await FirebaseService.createCourse(props.user, courseInfo)
  setIsCreateCourseDialogOpen(false);
  props.updateUser();  
  props.updateCourses();
}

  const hasCurrentCourses = false
  let currnetCoursesSection = null;
  if (props.user && props.user.createdCourses && props.user.createdCourses.length > 0 ) {
    currnetCoursesSection = <h3>You created some courses!</h3>
  } else {
    currnetCoursesSection = <h3>You have not created any courses</h3>
  }


  return (
    <div className="Home">
      <CssBaseline />
        <Typography className="center" variant="h3" component="h3">
          Classes You've Created
        </Typography>
        <Container className="userProfile-bottom-padding" maxWidth="lg">
          <Paper className="paper">
            {
              currnetCoursesSection     
            }
            <span>
              <Button variant="contained" color="primary" onClick={openCreateCourseDialog}>
                Create New Course
              </Button>
            </span>
          </Paper>
        </Container>
        <Divider />

        <CreateCourseDialog 
          isOpen={isCreateCourseDialogOpen}
          handleClose={handleCreateCourseDialogClose}
          handleSubmit={handleSubmit}
          user={props.user}
        />


    </div>
  );
}

export default CreateCourse;
