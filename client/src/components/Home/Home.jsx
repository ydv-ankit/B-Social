import { useEffect } from "react";
import Newpost from "../Newpost/Newpost";
import Posts from "../Posts/Posts";
import { getUserId } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";

import "./home.css";

export default function Home() {
  const navigate = useNavigate();
  let userData;

  useEffect(() => {
    const userId = getUserId();
    if (userId === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="home">
      <div className="homeWrapper">
        <div className="homeHead">
          <div className="homeHeadText">Home</div>
        </div>
        <div className="homeTopbar">
          <div className="homeForyou">For you</div>
          <div className="homeFollowing">Following</div>
        </div>
      </div>
      <div className="homeNewPostContainer">
        <Newpost userData={userData} />
      </div>
      <Posts />
    </div>
  );
}
