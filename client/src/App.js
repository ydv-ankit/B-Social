import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Main from "./Sections/main/Main";
import ExploreSection from "./Sections/exploreSection/ExploreSection";
import ProfileSection from "./Sections/profileSection/ProfileSection";

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
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
