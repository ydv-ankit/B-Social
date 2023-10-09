import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./components/auth/AuthPage";
import Home from "./components/Home/Home";
import Sidebar from "./components/sidebar/Sidebar";
import Rightbar from "./components/rightbar/Rightbar";

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
            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
