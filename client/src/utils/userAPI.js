import { getUsername } from "./getUsername";

async function createUserDb(data) {
  const profilePicture = data.user.photoURL;
  const email = data.user.email;
  const username = getUsername(email);
  const fullname = data.user.displayName;
  const createdAt = data.user.metadata.creationTime;
  const lastSignInTime = data.user.metadata.lastSignInTime;
  const userData = {
    profilePicture: profilePicture,
    firebaseUserId: data.user.uid,
    email: email,
    username: username,
    fullname: fullname,
    createdAt: createdAt,
    lastSignInTime: lastSignInTime,
  };
  try {
    const user = await fetch(process.env.REACT_APP_SERVER_URI + "users/new", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return true;
  } catch (error) {
    console.log("error occured");
    return false;
  }
}

async function getUserData(userId) {
  try {
    await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + userId)
      .then(async (tmp) => {
        const data = await tmp.json();
        return data.data
      })
      .catch((err) => { return null; })
  } catch (error) {
    console.log("Cannot get user data !!");
  }
}

export { createUserDb, getUserData };
