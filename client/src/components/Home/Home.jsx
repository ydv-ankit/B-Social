import Newpost from "../Newpost/Newpost";
import Posts from "../Posts/Posts";
import "./home.css";

export default function Home(props) {

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
        <Newpost userData={props.userData} />
      </div>
      <Posts userPosts={props.posts} userDetails={props.userDetails} />
    </div>
  );
}
