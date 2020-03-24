import React, { useState } from 'react';
import './UserProfile.css';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserProfileSection from './UserProfileSection/UserProfileSection.component';
import * as FirebaseService from '../../service/firebase.service';

const passwordValue = "*******";

function UserProfile(props) {

  const [displayName, setDisplayName] = useState(null);
  const [oldDisplayName, setOldDiplayName] = useState(null);
  const [error, setError] = useState();
  const [isDisplayNameDialogOpen, setIsDisplayNameDialogOpen] = useState(false)
  const [userInterests, setUserInterests] = useState(null);
  const [oldUserInterests, setOldUserInterests] = useState(null);
  const [isUserInterestsDialogOpen, setIsUserInterestsDialogOpen] = useState(false);



 function  handleDisplayNameClose(){
    setDisplayName(oldDisplayName)
    setIsDisplayNameDialogOpen(false)
  }

  function handleDisplayNameSubmit(){
    FirebaseService.updateUser(props.user.id, {
      displayName
    }).then( result => {
        setIsDisplayNameDialogOpen(false)
        setOldDiplayName(displayName)
      })
      .catch( err => {
        console.log(err);
      })
  
  }
 
  function openDisplayNameDialog(){
    setOldDiplayName(displayName)
    setIsDisplayNameDialogOpen(true)
  }

  function onDisplayNameChange(e){
    setDisplayName(e.target.value);
  }

  /**
   * Begin User Interests
   */
  function handleUserInterestsDialogClose(){
    setUserInterests(oldUserInterests)
    setIsUserInterestsDialogOpen(false)
  }

  function openUserInterestDialog(){
    setOldUserInterests(userInterests)
    setIsUserInterestsDialogOpen(true)
  }

  function onUserInterestsChange(e){
    setUserInterests(e.target.value);
  }

  function handleUserInterestSubmit(){
    FirebaseService.updateUser(props.user.id, {
      interests: userInterests
    }).then( result => {
        setIsUserInterestsDialogOpen(false)
        setUserInterests(userInterests)
      })
      .catch( err => {
        console.log(err);
      })
  
  }







  if (props.user && displayName === null && userInterests === null){
    setDisplayName(props.user.displayName)
    setUserInterests(props.user.interests)
  }

  if (props.user){
    return (
      <div className="userProfile">
        <CssBaseline />
        <Typography className="center" variant="h3" component="h3">
            User Profile
        </Typography>
        <Container className="userProfile-bottom-padding" maxWidth="lg">
          <Paper className="paper">

            <UserProfileSection 
              displayValue="User Interests" 
              value={userInterests}
              handleClose={handleUserInterestsDialogClose}
              handleSubmit={handleUserInterestSubmit}  
              isDialogOpen={isUserInterestsDialogOpen} 
              openDialog={openUserInterestDialog}  
              onChange={onUserInterestsChange}
            ></UserProfileSection>

          </Paper>
        </Container>
        <Divider />


        <Container maxWidth="lg">
          <Paper className="paper">
  
            <UserProfileSection 
              displayValue="Display Name" 
              value={displayName}
              handleClose={handleDisplayNameClose}
              handleSubmit={handleDisplayNameSubmit}  
              isDialogOpen={isDisplayNameDialogOpen} 
              openDialog={openDisplayNameDialog}  
              onChange={onDisplayNameChange}
            ></UserProfileSection>
            <Divider />
            <UserProfileSection displayValue="Email" value={props.user.email}></UserProfileSection>
            <Divider />
            <UserProfileSection displayValue="Password" value={passwordValue}></UserProfileSection>
  
          </Paper>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        Loading..
        <CircularProgress></CircularProgress>
      </div>
    )
  }

}

export default UserProfile;
