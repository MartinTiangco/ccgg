import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import callPrivateApi from "../auth/callPrivateApi";

// Create the context
const AppContext = React.createContext({
  isloading: true,
  userInfo: {},
  rank: {},
  matchSummary: {},
  recentMatches: {},
  bestChampions: {},
  updateContext: () => {},
});

function AppContextProvider({ children }) {
  const [isloading, setIsloading] = useState();
  const [userInfo, setUserInfo] = useState();
  const [rank, setRank] = useState();
  const [matchSummary, setMatchSummary] = useState();
  const [recentMatches, setRecentMatches] = useState();
  const [bestChampions, setBestChampions] = useState();

  const riotApiEndpoint = "/api/riot";

  const updateUserInfo = () => {
    const { loginWithRedirect } = useAuth0();
    const url = `${process.env.REACT_APP_SERVER_URL}${riotApiEndpoint}/summonerinfo`;

    const { loading, error, refresh, data } = callPrivateApi(url);

    const getTokenAndTryAgain = async () => {
      await loginWithRedirect();
      console.log("calling refresh");
      refresh();
    };

    useEffect(() => setIsloading(loading), [loading]);

    if (error) {
      console.log(error);
      if (error.error === "login_required") {
        console.log("login_required");
        // redirect to login
      }
      getTokenAndTryAgain();
      throw error;
    }

    useEffect(() => setUserInfo(data), [data]);
    // setUserInfo(data);
  };

  const updateRank = () => {
    const { loginWithRedirect } = useAuth0();

    const url = `${process.env.REACT_APP_SERVER_URL}${riotApiEndpoint}/rankedSummonerStats`;
    const { loading, error, refresh, data } = callPrivateApi(url);

    const getTokenAndTryAgain = async () => {
      await loginWithRedirect();
      console.log("calling refresh");
      refresh();
    };

    useEffect(() => setIsloading(loading), [loading]);
    if (error) {
      getTokenAndTryAgain();
      throw error;
    }

    useEffect(() => setRank(data), [data]);
    // setRank(data);
  };

  const updateMatchSummary = () => {
    const { loginWithRedirect } = useAuth0();
    const url = `${process.env.REACT_APP_SERVER_URL}${riotApiEndpoint}/match`;
    const { loading, error, refresh, data } = callPrivateApi(url);

    const getTokenAndTryAgain = async () => {
      await loginWithRedirect();
      console.log("calling refresh");
      refresh();
    };

    useEffect(() => setIsloading(loading), [loading]);
    if (error) {
      console.log(error);
      if (error.error === "login_required") {
        console.log("login_required");
        // redirect to login
      }
      getTokenAndTryAgain();
      throw error;
    }

    useEffect(() => setMatchSummary(data), [data]);
    // setMatchSummary(data);
  };

  const updateRecentMatches = () => {
    const { loginWithRedirect } = useAuth0();
    const url = `${process.env.REACT_APP_SERVER_URL}${riotApiEndpoint}/match`;
    const { loading, error, refresh, data } = callPrivateApi(url);

    const getTokenAndTryAgain = async () => {
      await loginWithRedirect();
      console.log("calling refresh");
      refresh();
    };

    useEffect(() => setIsloading(loading), [loading]);
    if (error) {
      console.log(error);
      if (error.error === "login_required") {
        console.log("login_required");
        // redirect to login
      }
      getTokenAndTryAgain();
      throw error;
    }

    useEffect(() => setRecentMatches(data), [data]);
    // setRecentMatches(data);
  };

  const updateBestChampions = () => {
    const { loginWithRedirect } = useAuth0();
    const url = `${process.env.REACT_APP_SERVER_URL}${riotApiEndpoint}/recentChampions`;
    const { loading, error, refresh, data } = callPrivateApi(url);

    const getTokenAndTryAgain = async () => {
      await loginWithRedirect();
      console.log("calling refresh");
      refresh();
    };

    useEffect(() => setIsloading(loading), [loading]);
    if (error) {
      console.log(error);
      if (error.error === "login_required") {
        console.log("login_required");
        // redirect to login
      }
      getTokenAndTryAgain();
      throw error;
    }

    useEffect(() => setBestChampions(data), [data]);
    // setBestChampions(data);
  };

  const refreshMatches = () => {
    const { loginWithRedirect } = useAuth0();
    const url = `${process.env.REACT_APP_SERVER_URL}${riotApiEndpoint}/refreshMatches`;

    const { loading, error, refresh } = callPrivateApi(url);

    const getTokenAndTryAgain = async () => {
      await loginWithRedirect();
      console.log("calling refresh");
      refresh();
    };

    useEffect(() => setIsloading(loading), [loading]);
    if (error) {
      console.log(error);
      if (error.error === "login_required") {
        console.log("login_required");
        // redirect to login
      }
      getTokenAndTryAgain();
      throw error;
    }
  };

  const updateAll = () => {
    updateUserInfo();
    updateRank();
    updateBestChampions();
    updateMatchSummary();
    updateRecentMatches();
  };

  const context = {
    isloading,
    userInfo,
    rank,
    matchSummary,
    recentMatches,
    bestChampions,
    updateAll,
    refreshMatches,
  };

  // Wraps the given child components in a Provider for the above context.
  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}

export { AppContext, AppContextProvider };
