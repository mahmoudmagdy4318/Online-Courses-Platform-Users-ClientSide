import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Home from "../components/Home/Home";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Logout from "../components/auth/Logout";
import Categories from "../components/Categroies/Categories";
import Courses from "../components/Courses/Courses";
import RegisteredCourses from "../components/Courses/RegisteredCourses";
import FinishedCourses from "../components/Courses/FinishedCourses";
import CategoryCourses from "../components/Categroies/CategoryCourses";
function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route key="login" exact path="/login" render={() => <Login />} />
        <Route key="signup" exact path="/register" render={() => <Signup />} />
        <Route key="logout" exact path="/logout" render={() => <Logout />} />
        <Route key="home" exact path="/" render={() => <Home value={0} />} />
        <Route
          key="categories"
          exact
          path="/categories"
          render={() => <Categories value={1} />}
        />
        <Route
          key="category courses"
          exact
          path="/categories/:id"
          render={(routeprops) => (
            <CategoryCourses id={routeprops.match.params.id} />
          )}
        />
        <Route
          key="courses"
          exact
          path="/courses"
          render={() => <Courses value={2} />}
        />

        <ProtectedRoute
          key="registered courses"
          exact
          path="/me/courses"
          render={() => <RegisteredCourses value={3} />}
        />
        <ProtectedRoute
          key="completed courses"
          exact
          path="/me/completed"
          render={() => <FinishedCourses value={4} />}
        />
        <Route path="*" render={() => "404 Not Found"} />
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
