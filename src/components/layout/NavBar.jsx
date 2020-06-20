import React, { useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ViewListIcon from "@material-ui/icons/ViewList";
import FeaturedPlayListIcon from "@material-ui/icons/FeaturedPlayList";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import { Button, Toolbar, Chip } from "@material-ui/core";
import { getToken } from "../../services/tokenService";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 50,
  },
  tabs: { margin: "auto" },
}));

export default function NavBar(props) {
  const token = getToken();
  const history = useHistory();
  const classes = useStyles();

  const {
    data: { user: currentUser },
  } = useContext(UserContext);

  const [value, setValue] = React.useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default">
        <Toolbar>
          {token && (
            <>
              <AccountCircleIcon style={{ marginLeft: 100 }} />
              <Typography>{eval(currentUser.username)}</Typography>
              <Chip label={currentUser.score} />
            </>
          )}

          <Tabs
            className={classes.tabs}
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab
              label="Home"
              icon={<HomeIcon />}
              {...a11yProps(0)}
              onClick={() => history.push("/")}
            />
            <Tab
              label="Categories"
              icon={<ViewListIcon />}
              {...a11yProps(1)}
              onClick={() => history.push("/categories")}
            />
            <Tab
              label="Courses"
              icon={<FeaturedPlayListIcon />}
              {...a11yProps(2)}
              onClick={() => history.push("/courses")}
            />
            {token && (
              <Tab
                label="Registered Courses"
                icon={<SubscriptionsIcon />}
                {...a11yProps(3)}
                onClick={() => history.push("/me/courses")}
              />
            )}
            {token && (
              <Tab
                label="Completed Courses"
                icon={<DoneAllIcon />}
                {...a11yProps(4)}
                onClick={() => history.push("/me/completed")}
              />
            )}
          </Tabs>
          {!token ? (
            <Button
              color="primary"
              style={{ marginRight: 100 }}
              onClick={() => history.push("/login")}
            >
              Login
            </Button>
          ) : (
            <Button
              color="secondary"
              style={{ marginRight: 100 }}
              onClick={() => history.push("/logout")}
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
