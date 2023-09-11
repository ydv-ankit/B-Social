import { useRef } from 'react'
import './newpost.css'

export default function Newpost() {

  const isActive = useRef(false);
  // console.log(isActive.current);

  return (
    <div className="newPost">
      <div className="newPostWrapper">
        <div className="newPostLeft">
          <div className="profileImg">
            <img src="assets/icons/twitter-x.png" alt="" />
          </div>
        </div>
        <div className="newPostRight">
          <div className="newPostInput">
            <input type="text" placeholder="What is happening?!" />
          </div>
          <div className="newPostOptions">
            <div className={isActive.current === true ? "fieldActive newPostCreate" : "fieldNotActive newPostCreate"} >
              <input type="submit" value={"Post"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
