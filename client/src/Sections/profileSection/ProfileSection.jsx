import { useState, useEffect } from 'react'
import { getUserId } from '../../utils/cookies';
import Sidebar from '../../components/sidebar/Sidebar'
import Profile from '../../components/profile/Profile'
import Rightbar from '../../components/rightbar/Rightbar'
import Loader from '../../components/loader/Loader'
import { useParams } from 'react-router-dom';

let userDetails = [];
const ProfileSection = () => {
  const { userId } = useParams();
  const [userPosts, setUserPosts] = useState(null);
  const [userData, setUserData] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const isSameUser = userId === getUserId() ? true : false;

  async function getUserData() {
    setIsLoading(true);
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

  const handleGetPosts = async () => {
    try {
      const resp = await fetch(process.env.REACT_APP_SERVER_URI + "posts/profileposts/" + userId);
      const posts = await resp.json();

      let userIds = [];
      posts.posts.forEach((element) => {
        userIds.push(element.userId);
      });

      // Remove duplicates
      const data = [...new Set(userIds)];

      // Create an array of promises for fetch requests
      const fetchPromises = data.map(async (id) => {
        const resp = await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + id);
        const get_resp_data = await resp.json();
        userDetails.push(get_resp_data.data);
      });

      // Wait for all fetch requests to complete
      await Promise.all(fetchPromises);
      setUserPosts(posts.posts);
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
  }, [])

  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      <Sidebar userData={userData} />
      <Profile userData={profileData} userPosts={userPosts} userDetails={userDetails} isSameUser={isSameUser} />
      <Rightbar />
    </>
  )
}

export default ProfileSection