import './posts.css'
import PostSection from '../PostSection/PostSection';
import { useEffect, useState } from 'react';
import { getStoredCookies } from "../../utils/cookies"

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);

  const handleGetPosts = async () => {
    const cookies = getStoredCookies();
    const regex = /userId=([^',]+)/;

    let userId = null;

    // Loop through the array and extract userId values
    cookies.forEach(item => {
      const match = item.match(regex);
      if (match) {
        // Push the matched userId value into the array
        userId = match[1];
      }
    });
    try{
    const resp = await fetch(process.env.REACT_APP_SERVER_URI + "posts/all/" + userId);
    const posts = await resp.json();

    posts.posts.map(async (element) => {
      const response = await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + element.userId);
      const userData = await response.json();
      console.log(userData);
      // setUserData((prevData)=> return [...prevData, userData])
    })
    setPosts(posts);
  }catch(err){
    console.log("error fetching posts...")
  }
  }

  useEffect(() => {
    handleGetPosts();
  }, [])



  return (
    <>
      {/* {
        posts ?
          posts.posts.map((element) => (
            <PostSection
              content={element.content}
              commentCount={element.comments.length}
              likeCount={element.likes.length}
            />
          ))
          : "Loading.."
      } */}
    </>
  )
}
