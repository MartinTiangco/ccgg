import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import SettingsIcon from "@material-ui/icons/Settings";

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon fontSize="large" />,
    link: "/home",
  },
  {
    title: "Launch League of Legends",
    icon: <VideogameAssetIcon fontSize="large" />,
    link: "/launchLeague",
  },
  {
    title: "Friends List",
    icon: <RecentActorsIcon fontSize="large" />,
    link: "/friends",
  },
  {
    title: "Settings",
    icon: <SettingsIcon fontSize="large" />,
    link: "/settings",
  },
];

export default SidebarData;
