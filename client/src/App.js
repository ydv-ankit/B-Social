import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/Home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Rightbar from "./components/rightbar/Rightbar";
import Explore from "./components/explore/Explore";

import "./App.css";

export default function App() {
  return (
    <>
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <Sidebar />
                  <Home />
                  <Rightbar />
                </>
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
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
