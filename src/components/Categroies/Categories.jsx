import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import ClassIcon from "@material-ui/icons/Class";
import Layout from "../layout/Layout";
import { useEffect } from "react";
import axiosInstance from "../../API/axiosInstance";
import Pagination from "@material-ui/lab/Pagination";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: 500,
    maxWidth: 1000,
    marginTop: theme.spacing(8),
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const Categories = () => {
  const classes = useStyles();
  const [pageNum, setPageNum] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    const { categories, lastPage } = await axiosInstance.get(
      `categories?page=${pageNum}`
    );
    setCategories(categories);
    setLastPage(Math.ceil(lastPage));
  };
  useEffect(() => {
    getCategories();
  }, [pageNum]);
  const handleChange = (event, value) => {
    setPageNum(value);
  };

  const history = useHistory();
  return (
    <div>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={classes.demo}>
              <List>
                {categories.map((category) => (
                  <ListItem
                    key={category.name}
                    onClick={() => history.push(`/categories/${category._id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <ClassIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={category.name} />
                  </ListItem>
                ))}
              </List>
            </div>
            <Pagination
              count={lastPage}
              size="large"
              page={pageNum}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Layout(Categories);
