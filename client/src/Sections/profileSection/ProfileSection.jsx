import { useState, useEffect } from 'react'
import { getUserId } from '../../utils/cookies';
import Sidebar from '../../components/sidebar/Sidebar'
import Profile from '../../components/profile/Profile'
import Rightbar from '../../components/rightbar/Rightbar'
const ProfileSection = () => {
  const [userData, setUserData] = useState();

  async function getUserData() {
    await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + getUserId())
      .then((tmp) => {
        return tmp.json();
      }).then((data) => {
        setUserData(data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getUserData();
  })

  return (
    <>
      <Sidebar userData={userData} />
      <Profile />
      <Rightbar />
    </>
  )
}

export default ProfileSection