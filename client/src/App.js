import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Main from "./Sections/main/Main";
import ExploreSection from "./Sections/exploreSection/ExploreSection";
import ProfileSection from "./Sections/profileSection/ProfileSection";
import FollowersPage from "./components/followersPage/FollowersPage";
import FollowingsPage from "./components/followingsPage/FollowingsPage";

export default function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            {/* authentication route */}
            <Route path="/" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            {/* home route */}
            <Route
              exact
              path="/home"
              element={
                <Main />
              }
            />
            {/* explore route */}
            <Route
              exact
              path="/explore"
              element={
                <ExploreSection />
              }
            />
            {/* profile page route */}
            <Route
              path="/profile/:userId"
              element={<ProfileSection />}
            />
            <Route
              path="/followers/:userProfileId"
              element={<FollowersPage />}
            />
            <Route
              path="/followings/:userProfileId"
              element={<FollowingsPage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
