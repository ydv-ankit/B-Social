import "./postPreview.css"
import '../Posts/posts.css'
import Comments from '../Comments/Comments'
import PostSection from "../PostSection/PostSection"
import { getUserId } from "../../utils/cookies";
import { getPostTime } from '../../utils/getPostTime';
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";

const PostPreview = ({ userPostDetails, userPostData }) => {
    const time = userPostData && getPostTime(userPostData.createdAt) || "error";
    const isLiked = userPostData.likes.includes(getUserId()) ? true : false;
    const [userData, setUserData] = useState();
    const [commentText, setCommentText] = useState("");
    const [commentBtn, setCommentBtn] = useState(false);
    const postAdmin = userPostDetails.firebaseUserId === getUserId() ? true : false;
    async function getUserData() {
        await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + getUserId())
            .then((tmp) => {
                return tmp.json();
            }).then((data) => {
                setUserData(data.data);
            })
            .catch((err) => console.log(err));
    }

    async function handleCommentPost() {
        setCommentBtn(false);
        await fetch(process.env.REACT_APP_SERVER_URI + 'post/comment', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: getUserId(), postId: userPostData._id, commentText: commentText })
        }).then((resp) => {
            return resp.json();
        }).then((data) => {
            setCommentText("");
        }).catch((err) => {
            setCommentText("");
            console.log(err);
        })
    }

    function handleCommentText(e) {
        setCommentText(e.target.value)
        if (e.target.value === "" || e.target.value === null) {
            setCommentBtn(false);
        } else {
            setCommentBtn(true);
        }
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
        <div className="postPreview">
            <div className="postPreviewWrapper">
                <div className="postPreviewTop">
                    <div className="postPreviewUserFullname">
                        <span>{userPostDetails.fullname}</span>
                    </div>
                    <div className="postPreviewUserPostTime">
                        {time}
                    </div>
                </div>
                <div className="postPreviewContent">
                    {
                        <PostSection
                            key={userPostDetails._id}
                            postId={userPostData._id}
                            postTime={time}
                            data={userPostDetails}
                            content={userPostData.content}
                            isLikedByUser={isLiked}
                            commentCount={userPostData.comments.length}
                            likeCount={userPostData.likes.length}
                            retweets={userPostData.retweets}
                            isRetweeted={userPostData.isRetweeted}
                            isPostPreview={true}
                        />
                    }
                </div>
                <div className="postPreviewNewComment">
                    <div className="comments">
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
                                </div>
                            </div>
                            <div className="commentsBottom">
                                <div className="newCommentInput">
                                    <input type="text" placeholder="New Comment..." onChange={(e) => handleCommentText(e)} value={commentText} />
                                </div>
                                {commentBtn && <button className="commentSubmitBtn" onClick={() => handleCommentPost()}>Comment</button>}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="postPreviewBottom">
                    <div className="postPreviewComments">
                        {userPostData.comments.length > 0 && userPostData.comments.map((e, _) => (
                            <Comments key={_} unique={_ + 1} userId={e.userId} comment={e.comment} postId={userPostData._id} isPostAdmin={postAdmin} />
                        ))
                            || <div className="noComments">Be the first to give feedback...</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPreview