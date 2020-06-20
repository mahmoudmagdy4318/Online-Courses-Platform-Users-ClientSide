import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import axiosInstance from "../../API/axiosInstance";
import Pagination from "@material-ui/lab/Pagination";
import { Grid, Container } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Course from "./Course";
import { UserContext } from "../../context/userContext";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(8),
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(4),
  },
}));

const Courses = (props) => {
  const { registered, finished, id } = props;

  //get user's data from context
  const {
    data: { user: currentUser },
  } = useContext(UserContext);

  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  //get registered or finished courses of loginned user
  const getUserCourses = () => {
    if (currentUser.courses && registered) {
      setCourses(
        currentUser.courses.slice(6 * (pageNum - 1), 6 + 6 * (pageNum - 1))
      );
      setLastPage(Math.ceil(currentUser.courses.length / 6));
    } else if (currentUser.finishedCourses && finished) {
      setCourses(
        currentUser.finishedCourses.slice(
          6 * (pageNum - 1),
          6 + 6 * (pageNum - 1)
        )
      );
      setLastPage(Math.ceil(currentUser.finishedCourses.length / 6));
    }
  };
  //get category courses
  const getCategoryCourses = async () => {
    const {
      category: { courses: catCourses },
    } = await axiosInstance.get(`categories/${id}`);

    setCourses(catCourses.slice(6 * (pageNum - 1), 6 + 6 * (pageNum - 1)));
    setLastPage(Math.ceil(catCourses.length / 6));
  };

  const getCourses = async () => {
    if (registered || finished) {
      getUserCourses();
    } else if (id) {
      getCategoryCourses();
    } else {
      const { courses, lastPage } = await axiosInstance.get(
        `courses?page=${pageNum}`
      );
      setCourses(courses);
      setLastPage(Math.ceil(lastPage / 6));
    }
  };
  useEffect(() => {
    getCourses();
  }, [pageNum, JSON.stringify(currentUser)]);

  const handleChange = (event, value) => {
    setPageNum(value);
  };
  const history = useHistory();
  return (
    <>
      <Container className={classes.root}>
        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid item xs={12} sm={8} md={4} key={course._id}>
              <Course courseData={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Pagination
        count={lastPage}
        size="large"
        page={pageNum}
        onChange={handleChange}
      />
    </>
  );
};
export default Layout(Courses);
