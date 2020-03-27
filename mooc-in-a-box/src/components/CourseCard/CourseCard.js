import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Button } from '@material-ui/core';
import {Link} from 'react-router-dom'


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
    minWidth: 345,
    maxHeight: 400,
    minHeight: 400,
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  actionsRow: {
    position: 'absolute',
    bottom: 0,
    left: 0
  }
}));

export default function CourseCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log(props)

  return (
    <Card variant="outlined" className={classes.root}>
      <CardHeader
        title={props.course.title}
        subheader={props.course.owner.displayName}
      />
      <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.course.description}
        </Typography> 
        <Typography variant="body2" color="textSecondary" component="p">
          {props.course.owner.displayName}
        </Typography>
      </CardContent>
      <CardActions className={classes.actionsRow} disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <Button 
          variant="contained" 
          color="primary"
          component={Link}
          to={`/courseOverview/${props.course.id}`}
          >
            Overview
        </Button>
      </CardActions>
    </Card>
  );
}