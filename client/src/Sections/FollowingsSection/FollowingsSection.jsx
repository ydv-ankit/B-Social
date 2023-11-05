import { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Loader from '../../components/loader/Loader'
import { getUserId } from '../../utils/cookies'
import FollowingsPage from '../../components/followingsPage/FollowingsPage'

const FollowingsSection = () => {

  const [userData, setUserData] = useState(null);

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
  }, [])

  if (!userData) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Sidebar userData={userData} />
      <FollowingsPage />
      <Rightbar />
    </>
  )
}

export default FollowingsSection