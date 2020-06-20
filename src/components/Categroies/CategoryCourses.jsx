import React from "react";
import Courses from "../Courses/Courses";

function CategoryCourses(props) {
  const { id } = props;
  return <Courses id={id} />;
}

export default CategoryCourses;
