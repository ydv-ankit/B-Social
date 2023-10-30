import { useState } from "react";
import { getUserId } from "../../utils/cookies";

import "./newpost.css";

export default function Newpost({ userData }) {
  const [isActive, setIsActive] = useState(false);
  const [postData, setPostData] = useState("");
  const [postError, setPostError] = useState("");


  function createNotification(text) {
    var successDiv = document.createElement("div");
    successDiv.className = "success";
    var textNode = document.createTextNode(text);
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

    await fetch(process.env.REACT_APP_SERVER_URI + "posts/new", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postObj),
    })
      .then(async (tmp) => {
        setPostData("");
        setIsActive(false);
        createNotification("Posted successfully !");
      })
      .catch((err) => setPostError("Posting error !!"));
  };

  function postinput(e) {
    e.preventDefault();
    e.target.value.length === 0 ? setIsActive(false) : setIsActive(true);

    setPostData(e.target.value);
  }

  return (
    <div className="newPost">
      <div className="newPostWrapper">
        <div className="newPostLeft">
          <div className="profileImg">
            <img src={userData && userData.profilePicture} alt="" />
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
              className="newPostCreate"
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
