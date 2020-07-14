import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import MenuM from "@material-ui/core/Menu";
import NavBar from "./NavBar";
import "../App.css";
import clsx from "clsx";
import { useHistory, Redirect } from "react-router-dom";
import Axios from "axios";
import Center from "./Center";
import { useAuth } from "../context/auth.js";
import CircularProgress from "@material-ui/core/CircularProgress";
import Avatar from "@material-ui/core/Avatar";
const Menu = () => {
  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display: "flex",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      outline: "none !important",
    },
    avatarButton: {
      outline: "none !important",
    },
    logoStyle: {
      height: "50%",
    },
    hide: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    loading: {
      position: "fixed",
      top: "50%",
      left: "50%",
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  }));
  const classes = useStyles();
  const [isLogOut, setIsLogOut] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [subjectCode, setSubjectCode] = React.useState([]);
  const openAnchor = Boolean(anchorEl);
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);
  const url = "/dashboard/subject/" + authUser.student.code;
  useEffect(() => {
    Axios.post(url, null, {
      headers: { Authorization: "Bearer " + authUser.tokens },
    }).then((response) => {
      response.data.map((element, index) => {
        setSubjectCode([
          {
            code: element.code,
            name: element.name,
          },
        ]);
      });
      setIsLoading(false);
    });
  }, [url]);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  console.log(subjectCode);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    localStorage.removeItem("tokenlogin");
    setIsLogOut(true);
  };
  if (isLogOut) {
    return <Redirect to={"/"} />;
  }
  if (isLoading) {
    return <CircularProgress className={classes.loading} />;
  }
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => {
      images[item.replace("./", "")] = r(item);
    });
    return images;
  }

  const images = importAll(
    require.context("../Resource/Image", false, /\.(png|jpe?g|svg)$/)
  );
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBarShift}
        style={{ background: "orange" }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            FPT Student Managerment
          </Typography>

          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              className={classes.avatarButton}
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar alt={authUser.student.name} src={images["loc.jpg"]} />
            </IconButton>
            <MenuM
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "center",
                horizontal: "right",
              }}
              getContentAnchorEl={null}
              open={openAnchor}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
            </MenuM>
          </div>
        </Toolbar>
      </AppBar>
      <Center open={open}></Center>
      <NavBar
        handleDrawerClose={handleDrawerClose}
        subjectCode={subjectCode}
      ></NavBar>
    </div>
  );
};

export default Menu;
