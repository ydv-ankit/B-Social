import "./postPreview.css"
import PostSection from "../PostSection/PostSection"

const PostPreview = ({ userPost }) => {
    return (
        <div className="postPreview">
            <div className="postPreviewWrapper">
                <div className="postPreviewTop">
                    <div className="postPreviewUserFullname">
                        <span>Ankit Ydv</span>
                    </div>
                    <div className="postPreviewUserPostTime">
                        Post Time
                    </div>
                </div>
                <div className="postPreviewContent">
                    {/* <PostSection
                        key={index}
                        postId={element._id}
                        postTime={time}
                        data={userPostData}
                        content={element.content}
                        isLikedByUser={isLiked}
                        commentCount={element.comments.length}
                        likeCount={element.likes.length}
                    /> */}
                </div>
                <div className="postPreviewBottom">
                    <div className="postPreviewComments">
                        {/* comments */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostPreview