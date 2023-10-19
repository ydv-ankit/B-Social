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
    await fetch(process.env.REACT_APP_SERVER_URI + "users/" + email)
      .then(async (resp) => {
        return true;
      }).catch(async (err) => {
        const user = await fetch(process.env.REACT_APP_SERVER_URI + "users/new", {
          method: "post",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });
      })
  } catch (error) {
    console.log("error occured");
    return false;
  }
}

export { createUserDb };
