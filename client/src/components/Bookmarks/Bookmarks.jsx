import { useEffect, useState } from "react"
import { getUserId } from "../../utils/cookies"
import Posts from "../Posts/Posts";
import Loader from "../loader/Loader";

const Bookmarks = () => {
  const [bookmarksData, setBookmarksData] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

  const getBookmarks = async () => {
    await fetch(process.env.REACT_APP_SERVER_URI + "post/get/bookmarks/" + getUserId())
      .then((resp) => {
        return resp.json()
      }).then((data) => {
        getUserDetails(data.data);
        setBookmarksData(data.data);
      })
  }

  const getUserDetails = async (data) => {
    data.forEach(async (element) => {
      await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + element.userId)
        .then((resp) => {
          return resp.json();
        })
        .then((response) => {
          setUserDetails((prevData) => [...prevData, response.data])
        }).catch((err) => {
          console.log(err);
        })
    })
  }

  useEffect(() => {
    getBookmarks();
  }, []);

  if (userDetails === null) {
    return (
      <Loader />
    )
  }

  return (
    <div className="bookmarks">
      {
        bookmarksData && bookmarksData?.length > 0
        ? <Posts userDetails={userDetails} userPosts={bookmarksData} />
        : <div className="nodata">Go & save some bookmarks</div>
      }
    </div>
  )
}

export default Bookmarks