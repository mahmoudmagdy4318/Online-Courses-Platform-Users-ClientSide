import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axiosInstance from "../../API/axiosInstance";
import _ from "lodash";
import { ListSubheader, IconButton } from "@material-ui/core";
import { UserContext } from "../../context/userContext";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: theme.spacing(10),
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  media: {
    height: 140,
  },
  catList: {
    marginTop: 5,
  },
}));

const Course = (props) => {
  //get user's data from context
  const {
    data: { user: currentUser },
    actions: { setUser },
  } = useContext(UserContext);

  const { _id, courses, finishedCourses, score } = currentUser;
  const { courseData } = props;
  const { _id: courseId, name, description, points } = courseData;
  const classes = useStyles();
  const history = useHistory();

  //to cancel registration in an course
  const handleCancel = async () => {
    await axiosInstance.delete(`user/${JSON.parse(_id)}/courses/${courseId}`);
    setUser({
      ...currentUser,
      courses: courses.filter((c) => c._id !== courseId),
    });
  };
  //to enroll in a course
  const handleRegister = async () => {
    await axiosInstance.post(`user/${JSON.parse(_id)}/courses/${courseId}`);
    setUser({ ...currentUser, courses: [...courses, courseData] });
  };

  //to mark a courses as completed
  const handleFinish = async () => {
    await axiosInstance.patch(`user/${JSON.parse(_id)}/courses/${courseId}`);
    setUser({
      ...currentUser,
      courses: courses.filter((c) => c._id !== courseId),
      finishedCourses: [...finishedCourses, courseData],
      score: +score + +points,
    });
  };
  return (
    <Card className={classes.root}>
      <CardActionArea style={{ flexGrow: 1 }}>
        <CardMedia
          className={classes.media}
          image="/favicon.ico"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <ListSubheader style={{ color: "red" }}>
            {points} points
          </ListSubheader>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {(courses && courses.find((c) => c._id === courseId)) ||
        (finishedCourses && finishedCourses.find((c) => c._id === courseId)) ? (
          <>
            {finishedCourses &&
            finishedCourses.find((c) => c._id === courseId) ? (
              <>
                <CheckCircleOutlineIcon />
                <Typography>Completed</Typography>
              </>
            ) : (
              <>
                <PlaylistAddCheckIcon />
                <Typography>Registered</Typography>
                <Button size="small" color="primary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Typography>Mark as finished</Typography>
                <IconButton edge="end" aria-label="add" onClick={handleFinish}>
                  <CheckBoxOutlineBlankIcon />
                </IconButton>
              </>
            )}
          </>
        ) : (
          <>
            <Button size="small" color="primary" onClick={handleRegister}>
              Register
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};
export default Course;
