import PostSection from '../PostSection/PostSection';
import { useEffect, useState } from 'react';
import { getUserId } from "../../utils/cookies"
import './posts.css'

const userDetails = [];
export default function Posts(props) {
  const [userPosts, setUserPosts] = useState([]);

  const handleGetPosts = async () => {
    const userId = getUserId();

    try {
      const resp = await fetch(process.env.REACT_APP_SERVER_URI + "posts/all/" + userId);
      const posts = await resp.json();

      let userIds = [];
      posts.posts.forEach((element) => {
        userIds.push(element.userId);
      });

      // Remove duplicates
      let data = Array.from(new Set(userIds));

      // Create an array of promises for fetch requests
      const fetchPromises = data.map(async (id) => {
        const resp = await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + id);
        const get_resp_data = await resp.json();
        userDetails.push(get_resp_data.data);
      });

      // Wait for all fetch requests to complete
      await Promise.all(fetchPromises);
      setUserPosts(posts.posts);
    } catch (err) {
      console.log("error fetching posts...", err);
    }
  }

  useEffect(() => {
    handleGetPosts();
  }, [])

  return (
    <>
      {
        userPosts ? (
          userPosts.map((element, _) => {

            const createdAt = element.createdAt; // Replace with your actual timestamp
            const createdAtDate = new Date(createdAt);
            const currentDateTime = new Date();

            // Calculate the time difference in milliseconds
            const timeDifference = currentDateTime - createdAtDate;

            // Calculate hours from milliseconds
            let time = Math.floor(timeDifference / (1000));
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
              time = Math.floor(timeDifference / (1000 * 60)) + " hrs";
            }
            else {
              // days to date
              time = createdAtDate.toString().substring(4, 24);
            }
            
            return (
              <PostSection
                key={_}
                postTime={time}
                data={userDetails[0]}
                content={element.content}
                commentCount={element.comments.length}
                likeCount={element.likes.length}
              />
            );
          })
        ) : <div className='noPosts'>No posts found !!</div>
      }

    </>
  )
}
