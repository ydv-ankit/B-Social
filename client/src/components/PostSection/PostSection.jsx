import { DeleteForever } from '@mui/icons-material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScreenRotationAltIcon from '@mui/icons-material/ScreenRotationAlt';
import { useState } from 'react';
import { getUserId } from "../../utils/cookies";
import { useNavigate } from 'react-router-dom';

export default function PostSection(props) {
    const navigate = useNavigate();
    const [isLiked, setIsLiked] = useState(props.isLikedByUser);
    const [likeCount, setLikeCount] = useState(props.likeCount);
    const [retweetCount, setRetweetCount] = useState(props.retweets.length)
    const postId = props.postId;
    const userId = getUserId();

    function handlePostProfileClick() {
        navigate('/profile/' + props.data.firebaseUserId);
    }

    function handleCommentSection() {
        if (!props.isPostPreview) {
            navigate('/post/' + props.data.firebaseUserId + "/" + props.postId);
        } else {
            return;
        }
    }

    async function handlePostRetweet() {
        setRetweetCount(retweetCount + 1);
        await fetch(process.env.REACT_APP_SERVER_URI + 'post/retweet/' + getUserId() + '/' + props.postId)
            .then((resp) => {
                return resp.json()
            }).then((data) => {
                return;
            }).catch((err) => {
                console.log(err);
            })
    }

    async function handleDeletePost(e) {
        document.getElementById(props.postId).remove();
        await fetch(process.env.REACT_APP_SERVER_URI + "post/delete/" + props.postId)
            .then((resp) => {
                return resp.json()
            }).then((data) => {
                return;
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleLike = async () => {
        if (isLiked) {
            setIsLiked(!isLiked);
            setLikeCount(likeCount - 1);
            await fetch(process.env.REACT_APP_SERVER_URI + "post/like/" + userId + '/' + postId)
                .then((resp) => {
                    return resp.json();
                })
                .then((data) => {
                    return;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            setIsLiked(!isLiked);
            setLikeCount(likeCount + 1)
            await fetch(process.env.REACT_APP_SERVER_URI + "post/like/" + userId + '/' + postId)
                .then((resp) => {
                    return resp.json();
                })
                .then((data) => {
                    return;
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="posts" id={props.postId} >
            <div className="postsWrapper">
                <div className="profileImg" onClick={handlePostProfileClick}>
                    <img src={props.data && props.data.profilePicture} alt="" />
                </div>
                <div className="postsContent">
                    <div className="postsUserDetails">
                        <div className='postUserDetailsHover' onClick={handlePostProfileClick}>
                            <span className="postsUserFullname">
                                {props.data && props.data.fullname}
                            </span>
                            <span className="postsUserUsername">
                                @{props.data && props.data.username}
                            </span>
                            <span className="postsUserDetailsSeperator">.</span>
                            {props.isRetweeted && <span className="postsUserDetailsIsRetweeted">(Reposted)</span>}
                        </div>
                        <div className="postsTopRight">
                            <span className="postsTime">{props.postTime.toString()}</span>
                        </div>
                    </div>
                    <div className="postsInnerContent">
                        <p>{props.content}</p>
                    </div>
                    <div className="postsBottomActions">
                        <span className="postsBottomSection" onClick={handleCommentSection} >
                            <span className="postsBottomSectionIcon">
                                <ChatBubbleOutlineIcon />
                            </span>
                            <span className="postsCount">{props.commentCount}</span>
                        </span>
                        <span className="postsBottomSection">
                            <span className="postsBottomSectionIcon" onClick={handlePostRetweet}>
                                <ScreenRotationAltIcon />
                            </span>
                            <span className="postsCount">{retweetCount}</span>
                        </span>
                        <span className="postsBottomSection">
                            <span className="postsBottomSectionIcon" onClick={handleLike}>
                                {isLiked
                                    ? <FavoriteIcon />
                                    : <FavoriteBorderIcon />
                                }
                            </span>
                            <span className="postsCount">{likeCount}</span>
                        </span>
                        {props.data && (props.data.firebaseUserId === getUserId()) &&
                            <span className="postsBottomSection">
                                <span className="postsBottomSectionIcon" onClick={handleDeletePost}>
                                    {
                                        <DeleteForever />
                                    }
                                </span>
                            </span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
