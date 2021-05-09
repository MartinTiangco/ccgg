const riotApiEndpoint = "/api/riot";
const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

const refreshMatches = async (getAccessTokenSilently) => {
  console.log("calling refresh matches");
  const url = `${process.env.REACT_APP_SERVER_URL}${riotApiEndpoint}/refreshMatches`;

  try {
    const accessToken = await getAccessTokenSilently({ audience });
    await fetch(url, {
      method: "get",
      headers: {
        // Add the Authorization header to the existing headers
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export default refreshMatches;
