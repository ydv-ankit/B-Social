import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Main from "./Sections/main/Main";
import ExploreSection from "./Sections/exploreSection/ExploreSection";
import ProfileSection from "./Sections/profileSection/ProfileSection";
import FollowersSection from "./Sections/FollowersSection/FollowersSection";
import FollowingsSection from "./Sections/FollowingsSection/FollowingsSection";
import PostPreviewSection from "./Sections/postPreviewSection/PostPreviewSection";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import { getUserId } from "./utils/cookies";
import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import Rightbar from "./components/rightbar/Rightbar";

export default function App() {
  const isLoggedIn = (getUserId() === null || getUserId() === 'null') ? false : true;
  const [userData, setUserData] = useState(null);

  async function getUserData() {
    await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + getUserId())
      .then((tmp) => {
        return tmp.json();
      }).then((data) => {
        setUserData(data.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn])

  return (
    <>
      <div className="container">
        <BrowserRouter>
          {isLoggedIn && <Sidebar userData={userData} />}
          <Routes>
            {/* authentication route */}
            <Route path="/" element={isLoggedIn ? <Main /> : <AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            {/* explore route */}
            <Route
              exact
              path="/explore"
              element={
                <ExploreSection />
              }
            />
            {/* bookmarks */}
            <Route
              path="/bookmarks"
              element={<Bookmarks />}
            />
            {/* profile page route */}
            <Route
              path="/profile/:userId"
              element={<ProfileSection />}
            />
            <Route
              path="/followers/:userProfileId"
              element={<FollowersSection />}
            />
            <Route
              path="/followings/:userProfileId"
              element={<FollowingsSection />}
            />
            <Route
              path="/post/:userId/:postId"
              element={<PostPreviewSection />}
            />
          </Routes>
          {isLoggedIn && <Rightbar />}
        </BrowserRouter>
      </div>
    </>
  );
}
