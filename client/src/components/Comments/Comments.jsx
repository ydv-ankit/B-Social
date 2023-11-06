import { useEffect, useState } from 'react'
import './comments.css'
import Loader from '../loader/Loader';
import { DeleteForever } from '@mui/icons-material';
import { getUserId } from '../../utils/cookies';

const Comments = (props) => {

  const [userData, setUserData] = useState();

  async function getUserData() {
    await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + props.userId)
      .then((tmp) => {
        return tmp.json();
      }).then((data) => {
        setUserData(data.data);
      })
      .catch((err) => console.log(err));
  }

  async function handleCommentPostDelete() {
    await fetch(process.env.REACT_APP_SERVER_URI + 'post/comment/delete', {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: props.userId, postId: props.postId, commentText: props.comment })
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
    }).catch((err) => {
      console.log(err);
    })
    document.getElementById(props.unique).remove();
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
    <div id={props.unique} className="comments">
      <div className="commentsWrapper">
        <div className="commentsTop">
          <div className="profileImg">
            <img src={userData && userData.profilePicture} alt="profile" />
          </div>
          <div className="commentsRight">
            <div className="commentsProfile">
              <span className='commentsProfileFullname'>{userData && userData.fullname}</span>
              <span className='commentsProfileUsername'>@{userData && userData.username}</span>
            </div>
            {(userData.firebaseUserId === getUserId() || props.isPostAdmin) && <div className="commentsDeleteIcon" onClick={handleCommentPostDelete}><DeleteForever /></div>}
          </div>
        </div>
        <div className="commentsBottom">
          <div className="commentsContent">
            {props.comment}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comments