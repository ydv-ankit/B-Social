import { useState, useEffect } from 'react'
import { getUserId } from '../../utils/cookies';
import Sidebar from '../../components/sidebar/Sidebar'
import Profile from '../../components/profile/Profile'
import Rightbar from '../../components/rightbar/Rightbar'
import Loader from '../../components/loader/Loader'
import { useParams } from 'react-router-dom';

const ProfileSection = () => {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [userDetails, setUserDetails] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isSameUser = userId === getUserId() ? true : false;

  async function getUserData() {
    await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + getUserId())
      .then((tmp) => {
        return tmp.json();
      }).then((data) => {
        setUserData(data.data);
      })
      .catch((err) => console.log(err));
  }

  async function getProfileUserData() {
    await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + userId)
      .then((tmp) => {
        return tmp.json();
      }).then((data) => {
        setProfileData(data.data);
      })
      .catch((err) => console.log(err));
  }

  async function getUserDetails(userIdData) {
    userIdData.forEach(async (id) => {
      await fetch(process.env.REACT_APP_SERVER_URI + 'users/id/' + id)
        .then((resp) => {
          return resp.json()
        })
        .then((data) => {
          setUserDetails((prevData) => [...prevData, data.data])
        }).catch((err) => {
          console.log(err);
        })
    })
  }

  const handleGetPosts = async () => {
    try {
      const resp = await fetch(process.env.REACT_APP_SERVER_URI + "posts/profileposts/" + userId);
      const posts = await resp.json();

      let userIds = [];
      posts.posts.forEach((element) => {
        userIds.push(element.userId);
      });

      // Remove duplicates
      let data = [];
      userIds.map((id) => {
        if (!data.includes(id)) {
          data.push(id);
        }
        return true;
      })
      setUserPosts(posts.posts);
      getUserDetails(data)
      setIsLoading(false);
    } catch (err) {
      console.log("error fetching posts...", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
    getProfileUserData();
    handleGetPosts();
  }, [userId])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Sidebar userData={userData} />
      <Profile userData={profileData} userPosts={userPosts} userDetails={userDetails} isSameUser={isSameUser} userId={userId} />
      <Rightbar />
    </>
  )
}

export default ProfileSection