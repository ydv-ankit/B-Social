import "./postPreview.css"
import '../Posts/posts.css'
import Comments from '../Comments/Comments'
import PostSection from "../PostSection/PostSection"
import { getUserId } from "../../utils/cookies";
import { getPostTime } from '../../utils/getPostTime';

const PostPreview = ({ userPostDetails, userPostData }) => {
    const time = userPostData && getPostTime(userPostData.createdAt) || "error";
    const isLiked = userPostData.likes.includes(getUserId()) ? true : false;

    console.log(userPostData.comments);

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
                <div className="postPreviewBottom">
                    <div className="postPreviewComments">
                        {userPostData.comments.length > 0 && userPostData.comments.map((e) => (
                            <Comments text={e} />
                        ))
                        ||  <div className="noComments">Be the first to give feedback...</div>
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPreview