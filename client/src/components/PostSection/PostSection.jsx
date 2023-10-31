import { MoreHorizOutlined } from '@mui/icons-material';
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
    const postId = props.postId;
    const userId = getUserId();

    function handlePostProfileClick() {
        navigate('/profile/' + props.data.firebaseUserId);
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
        <div className="posts">
            <div className="postsWrapper">
                <div className="profileImg" onClick={handlePostProfileClick}>
                    <img src={props.data.profilePicture} alt="" />
                </div>
                <div className="postsContent">
                    <div className="postsUserDetails">
                        <div className='postUserDetailsHover' onClick={handlePostProfileClick}>
                            <span className="postsUserFullname">
                                {props.data.fullname}
                            </span>
                            <span className="postsUserUsername">
                                @{props.data.username}
                            </span>
                            <span className="postsUserDetailsSeperator">.</span>
                        </div>
                        <div className="postsTopRight">
                            <span className="postsTime">{props.postTime.toString()}</span>
                        </div>
                    </div>
                    <div className="postsInnerContent">
                        <p>{props.content}</p>
                    </div>
                    <div className="postsBottomActions">
                        <span className="postsBottomSection">
                            <span className="postsBottomSectionIcon">
                                <ChatBubbleOutlineIcon />
                            </span>
                            <span className="postsCount">{props.commentCount}</span>
                        </span>
                        <span className="postsBottomSection">
                            <span className="postsBottomSectionIcon">
                                <ScreenRotationAltIcon />
                            </span>
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
                    </div>
                </div>
            </div>
        </div>
    )
}
