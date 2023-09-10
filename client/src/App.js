import Sidebar from "./components/sidebar/Sidebar";
import Feed from "./components/feed/Feed";
import Rightbar from "./components/rightbar/Rightbar";
import "./App.css";
import Home from "./components/Home/Home";

export default function App() {
  return (
    <>
      <div className="container">
        <Sidebar />
        <Home />
        <Rightbar />
      </div>
    </>
  );
}