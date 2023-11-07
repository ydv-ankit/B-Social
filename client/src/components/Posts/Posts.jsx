import PostSection from '../PostSection/PostSection';
import { getUserId } from "../../utils/cookies";
import { getPostTime } from '../../utils/getPostTime';
import './posts.css';
import { useEffect } from 'react';
import Loader from '../loader/Loader';

export default function Posts({ userPosts, userDetails }) {
  const sortedPosts = userPosts && userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (!userDetails || (userPosts.length !== 0 && userDetails && userDetails.length === 0)) {
    return (
      <div className="toCenterLoader">
        <Loader />
      </div>
    )
  }

  return (
    <>
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((element, index) => {

          const time = getPostTime(element.createdAt);

          let userId = getUserId();
          let isLiked = element.likes.includes(userId);

          let userPostData;
          // get userDetails of current post
          userDetails.forEach((e) => {
            if (e.firebaseUserId === element.userId) {
              userPostData = e;
            }
          });

          const isBookmark = element.bookmarks.includes(getUserId());

          return (
            <PostSection
              key={index}
              postId={element._id}
              postTime={time}
              data={userPostData}
              content={element.content}
              isLikedByUser={isLiked}
              commentCount={element.comments.length}
              likeCount={element.likes.length}
              retweets={element.retweets}
              isRetweeted={element.isRetweeted}
              isPostPreview={false}
              isBookmarked={isBookmark}
            />
          );
        })
      ) : (
        <div className='noPosts'>No posts found !! Follow someone ...</div>
      )}
    </>
  );
}
