import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import { Box, Tooltip, MenuItem, MenuList } from "@material-ui/core";
import clsx from "clsx";

import { SidebarData } from "./SidebarData";
import AuthenticationButton from "./AuthenticationButton";
import logos from "../../images";
import "react-notifications-component/dist/theme.css";
import "animate.css";

const useStyles = makeStyles((theme) => ({
  sidebarPlaceHolder: {
    width: "110px",
    height: "100%",
  },
  sidebarRoot: {
    height: "100%",
    minHeight: "500px",
    width: "110px",
    backgroundColor: theme.palette.primary.main,
    position: "fixed",
  },
  logoBox: {
    height: "10%",
  },
  menuRoot: {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  menuItemRoot: {
    width: "100%",
    height: "80px",
    justifyContent: "center",
    "&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover": {
      background:
        "linear-gradient(270deg, rgba(51, 71, 116, 0) 0%, rgba(40, 49, 80, 0.5) 60%);",
      borderLeft: `5px solid ${theme.palette.primary.dark}`,
      borderRight: `5px solid ${theme.palette.primary.main}`,
    },
  },
  menuItemSelected: {},
  autoLeftRightMargin: {
    margin: "0 auto",
  },
  logoImg: {
    width: "80%",
    marginTop: "10px",
  },
}));

function Sidebar() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <>
      <div className={classes.sidebarPlaceHolder} />
      <div className={classes.sidebarRoot}>
        <Box display="flex" flexDirection="column" className={classes.logoBox}>
          <img
            src={logos.logo512Inverted}
            alt="Logo"
            className={clsx(classes.autoLeftRightMargin, classes.logoImg)}
          />
        </Box>
        <MenuList className={classes.menuRoot}>
          <Box display="flex" flexDirection="column">
            {SidebarData.map((val) => {
              return (
                <Tooltip title={val.title} enterDelay={200} key={val.link}>
                  <MenuItem
                    key={val.link}
                    component={Link}
                    to={val.link}
                    classes={{
                      root: classes.menuItemRoot,
                      selected: classes.menuItemSelected,
                    }}
                    selected={val.link === location.pathname}
                  >
                    {val.icon}
                  </MenuItem>
                </Tooltip>
              );
            })}
          </Box>
        </MenuList>
        <AuthenticationButton />
      </div>
    </>
  );
}

export default Sidebar;
