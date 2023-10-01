import { MoreHorizOutlined } from '@mui/icons-material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ScreenRotationAltIcon from '@mui/icons-material/ScreenRotationAlt';
import EqualizerIcon from '@mui/icons-material/Equalizer';

export default function PostSection(props) {
    return (
        <div className="posts">
            <div className="postsWrapper">
                <div className="profileImg">
                    <img src={props.profilePicture} alt="" />
                </div>
                <div className="postsContent">
                    <div className="postsUserDetails">
                        <div>
                            <span className="postsUserFullname">
                                {props.fullname}
                            </span>
                            <span className="postsUserUsername">
                                @{props.username}
                            </span>
                            <span className="postsUserDetailsSeperator">.</span>
                            <span className="postsTime">2h</span>
                        </div>
                        <span className="postsMoreOptions">
                            <MoreHorizOutlined />
                        </span>
                    </div>
                    <div className="postsContent">
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
                        <span className="postsBottomSection">
                            <span className="postsBottomSectionIcon">
                                <EqualizerIcon />
                            </span>
                            <span className="postsCount">{props.viewCount}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
