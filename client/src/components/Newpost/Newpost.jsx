import { useEffect, useState } from "react";
import { getUserId } from "../../utils/cookies";

import "./newpost.css";

export default function Newpost(props) {
  const [isActive, setIsActive] = useState(false);
  const [postData, setPostData] = useState("");
  const [postError, setPostError] = useState("");
  const [userData, setUserData] = useState();

  async function getUserData(uid) {
    try {
      const tmp = await fetch(
        process.env.REACT_APP_SERVER_URI + "users/id/" + uid
      );
      const data = await tmp.json();
      if (data.data) {
        setUserData(data.data);
        console.log(userData);
      }
    } catch (error) {
      console.log("Cannot get user data !!");
    }
  }

  function createNotification() {
    var successDiv = document.createElement("div");
    successDiv.className = "success";
    var textNode = document.createTextNode("Posted successfully !");
    successDiv.appendChild(textNode);
    document.querySelector(".newPost").appendChild(successDiv);

    setTimeout(() => {
      successDiv.parentNode.removeChild(successDiv);
    }, 5000);
  }

  const createPost = async () => {
    if (!isActive) return;
    const postObj = {
      userId: getUserId(),
      content: postData,
    };

    try {
      const resp = await fetch(process.env.REACT_APP_SERVER_URI + "posts/new", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postObj),
      });
      setPostData("");
      setIsActive(false);
      createNotification();
    } catch (error) {
      setPostError("Try again later !");
    }
  };

  function postinput(e) {
    e.preventDefault();
    e.target.value.length === 0 ? setIsActive(false) : setIsActive(true);

    setPostData(e.target.value);
  }

  useEffect(() => {
    getUserData(getUserId());
  }, []);

  return (
    <div className="newPost">
      <div className="newPostWrapper">
        <div className="newPostLeft">
          <div className="profileImg">
            <img src={userData} alt="" />
          </div>
        </div>
        <div className="newPostRight">
          <div className="newPostInput">
            <input
              type="text"
              placeholder="What is happening?!"
              value={postData}
              onChange={postinput}
            />
          </div>
          <div className="newPostOptions">
            <div
              className={isActive === true ? "newPostCreate" : "newPostCreate"}
            >
              <input
                className={isActive === true ? "fieldActive" : "fieldNotActive"}
                type="submit"
                value={"Post"}
                onClick={(e) => createPost()}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="error">{postError}</div>
    </div>
  );
}
