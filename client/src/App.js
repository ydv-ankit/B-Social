import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Sidebar from "./components/sidebar/Sidebar";
import Rightbar from "./components/rightbar/Rightbar";
import Explore from "./components/explore/Explore";

import "./App.css";
import Main from "./components/Sections/main/Main";

export default function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route
              exact
              path="/home"
              element={
                <Main />
              }
            />
            <Route
              exact
              path="/explore"
              element={
                <>
                  <Sidebar />
                  <Explore />
                  <Rightbar />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
