import PostSection from '../PostSection/PostSection';
import { getUserId } from "../../utils/cookies";
import './posts.css';

export default function Posts({ userPosts, userDetails }) {
  const sortedPosts =userPosts && userPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {sortedPosts && sortedPosts.length > 0 ? (
        sortedPosts.map((element, index) => {
          const createdAt = element.createdAt; // Replace with your actual timestamp
          const createdAtDate = new Date(createdAt);
          const currentDateTime = new Date();

          // Calculate the time difference in milliseconds
          const timeDifference = currentDateTime - createdAtDate;

          // Calculate hours from milliseconds
          let time = Math.floor(timeDifference / 1000);
          if (time > 60) {
            // seconds to minutes
            time = Math.floor(timeDifference / (1000 * 60)) + " s";
          }
          if (time > 60 * 60) {
            // minutes to hours
            time = Math.floor(timeDifference / (1000 * 60 * 60)) + " m";
          }
          if (time > 60 * 60 * 24) {
            // hours to days
            time = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) + " hrs";
          } else {
            // days to date
            time = createdAtDate.toString().substring(4, 24);
          }

          let userId = getUserId();
          let isLiked = element.likes.includes(userId);

          let userPostData;
          // get userDetails of current post
          userDetails.forEach((e) => {
            if (e.firebaseUserId === element.userId) {
              userPostData = e;
            }
          });

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
            />
          );
        })
      ) : (
        <div className='noPosts'>No posts found !!</div>
      )}
    </>
  );
}
