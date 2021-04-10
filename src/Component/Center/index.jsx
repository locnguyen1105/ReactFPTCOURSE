import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

const drawerWidth = 470;
const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: "70px",
    marginLeft: 240,
  },
}));
const Center = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container fixed className={classes.content}>
        <Typography
          component="div"
          style={{ backgroundColor: "#fafafa", height: "90vh" }}
        ></Typography>
      </Container>
    </React.Fragment>
  );
};
export default Center;
