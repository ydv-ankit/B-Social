import { MoreHorizOutlined } from '@mui/icons-material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScreenRotationAltIcon from '@mui/icons-material/ScreenRotationAlt';

export default function PostSection(props) {
    return (
        <div className="posts">

            {
                // console.log(props.postTime.toString())
            }
            <div className="postsWrapper">
                <div className="profileImg">
                    <img src={props.data.profilePicture} alt="" />
                </div>
                <div className="postsContent">
                    <div className="postsUserDetails">
                        <div>
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
                            <span className="postsMoreOptions">
                                <MoreHorizOutlined />
                            </span>
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
                            <span className="postsBottomSectionIcon">
                                <FavoriteBorderIcon />
                            </span>
                            <span className="postsCount">{props.likeCount}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
