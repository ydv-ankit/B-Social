import './profile.css'
import Posts from '../Posts/Posts'
import { useEffect, useState } from 'react';
import { getUserId } from '../../utils/cookies';
import FollowingsPage from '../followingsPage/FollowingsPage';
import FollowersPage from '../followersPage/FollowersPage';
import Loader from '../loader/Loader';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userData, userPosts, userDetails, isSameUser, userId }) => {

  const [isFollowing, setIsFollowing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.followers.includes(getUserId())) {
      setIsFollowing(true);
    }
  }, [isFollowing, userData, userDetails, isSameUser, userId])

  if (!userData || !userDetails) {
    return (
      <Loader />
    )
  }

  async function handleFollow() {
    if (isFollowing) {
      userData.followers.pop(getUserId());
    } else {
      userData.followers.push(getUserId());
    }
    setIsFollowing(!isFollowing);
    await fetch(process.env.REACT_APP_SERVER_URI + "users/followings", {
      method: "put",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ userId: getUserId(), followId: userData.firebaseUserId })
    }).then((resp) => {
      return resp.json()
    }).then((data) => {
      return;
    }).catch((err) => {
    })
  }



  return (
    <div className='profile'>
      <div className="profileWrapper">
        <div className="profileTop">
          <div className="profileTopbar">
            <div className="profileTopbarFullname">
              {userData.fullname}
            </div>
            <div className="profileTopbarPostsCount">
              {userPosts.length + " posts"}
            </div>
          </div>

          <div className="profileCenter">
            <div className="profileCenterContent">
              <div className="profileCenterUserPicCircle">
                <div className="profileCenterUserPicCircleImg">
                  <img src={userData && userData.profilePicture} alt="user picture" />
                </div>
              </div>
              <div className="profileCenterContentFullname">
                {userData.fullname}
              </div>
              <div className="profileCenterContentUsername">
                {userData.username}
              </div>
              {
                isSameUser
                  ? null
                  : <div className="profileCenterContentInfoFollow">
                    <button className={isFollowing ? "followingBtn" : "followBtn"} onClick={handleFollow}>{isFollowing ? "Following" : "Follow"}</button>
                  </div>
              }
            </div>
            <div className="profileCenterContentInfo">
              <div className="profileCenterContentInfoFollowers">
                <span className='follow' onClick={() => navigate('/followers/' + userId)}>Followers</span><span>{userData.followers.length}</span>
              </div>
              <div className="profileCenterContentInfoFollowings">
                <span className='follow' onClick={() => navigate('/followings/' + userId)}>Followings</span><span>{userData.followings.length}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="profileUserPosts">
          {userPosts && userDetails && <Posts userPosts={userPosts} userDetails={userDetails} />}
        </div>
      </div>
    </div>
  )
}

export default Profile