import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, IconButton } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(() => ({
  LoginLogoutBox: {
    height: "10%",
  },
  autoLeftRightMargin: {
    margin: "0 auto",
  },
  LoginLogoutIcon: {
    fontSize: 50,
  },
}));

const LoginButton = () => {
  const classes = useStyles();
  const { loginWithRedirect } = useAuth0();
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.LoginLogoutIconBox}
    >
      <IconButton className={classes.autoLeftRightMargin}>
        <PersonIcon
          onClick={() => loginWithRedirect()}
          className={classes.LoginLogoutIcon}
        />
      </IconButton>
    </Box>
  );
};

const LogoutButton = () => {
  const classes = useStyles();
  const { logout } = useAuth0();
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={classes.LoginLogoutIconBox}
    >
      <IconButton className={classes.autoLeftRightMargin}>
        <ExitToAppIcon
          onClick={() => logout({ returnTo: window.location.origin })}
          className={classes.LoginLogoutIcon}
        />
      </IconButton>
    </Box>
  );
};

const LoginLogoutButton = () => {
  const { isAuthenticated } = useAuth0();
  if (!isAuthenticated) {
    return <LoginButton />;
  }
  return <LogoutButton />;
};

export default LoginLogoutButton;
