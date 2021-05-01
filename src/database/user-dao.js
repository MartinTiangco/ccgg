import User from "./schema";

// retrieve the User using the unique 'sub' identifier
const retrieveUser = async (sub) => {
  const user = await User.findOne({ sub });
  return user;
};

export default retrieveUser;
