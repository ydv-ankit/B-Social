import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  BookmarkBorderOutlined,
  MoreHorizOutlined,
  PersonOutlineOutlined,
  Search,
} from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { Link } from 'react-router-dom';
import { getUserId, removeCookies } from '../../utils/cookies';

import "./sidebar.css";
import { useEffect } from "react";

const ROUTES = {
  HOME: "/",
  EXPLORE: "/explore",
  NOTIFICATIONS: "/notifications",
  MESSAGES: "/messages",
  BOOKMARKS: "/bookmarks",
  PROFILE: "/profile/" + getUserId()
};

export default function Sidebar({ userData }) {

  function handleBottomLinkClickLogOut(e) {
    document.getElementById("sidebarPopUp").style.display = "none";
    removeCookies("userId");
  }

  function handleBottomLinkClickProfile(e) {
    document.getElementById("sidebarPopUp").style.display = "none";
  }

  function handleProfileClick(e) {
    document.getElementById("sidebarPopUp").style.display === "none"
      ? document.getElementById("sidebarPopUp").style.display = "block"
      : document.getElementById("sidebarPopUp").style.display = "none";
  }

  useEffect(() => {
    if (getUserId() === null || getUserId() === "null") {
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarContents">
          <div className="sidebarLogo">
            <img src="/assets/icons/twitter-x.svg" alt="Twitter" />
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <HomeIcon />
              </div>
              <div className="sidebarLinkText" ><Link to={ROUTES.HOME}>Home</Link></div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <Search />
              </div>
              <div className="sidebarLinkText" ><Link to={ROUTES.EXPLORE}>Explore</Link></div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <NotificationsNoneIcon />
              </div>
              <div className="sidebarLinkText" ><Link to={ROUTES.NOTIFICATIONS}>Notifications</Link></div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <MailOutlineIcon />
              </div>
              <div className="sidebarLinkText" ><Link to={ROUTES.MESSAGES}>Messages</Link></div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <BookmarkBorderOutlined />
              </div>
              <div className="sidebarLinkText" ><Link to={ROUTES.BOOKMARKS}>Bookmarks</Link></div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <PersonOutlineOutlined />
              </div>
              <div className="sidebarLinkText" ><Link to={ROUTES.PROFILE}>Profile</Link></div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkText" >
              <div className="postText">
                <Link to={ROUTES.NEWPOST}>POST</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="sidebarBottomLinks" onClick={handleProfileClick}>
          <div className="sidebarBottomProfile" >
            <div className="profileLeft">
              <div className="profileImg">
                <img src={userData && userData.profilePicture} alt="userprofile" />
              </div>
              <div className="profileText">
                <div className="profileName">{userData && userData.fullname}</div>
                <div className="profileUsername">@{userData && userData.username}</div>
              </div>
            </div>
            <div className="moreOptions">
              <MoreHorizOutlined />
            </div>
          </div>
          <div className="sidebarBottomPopUp" id="sidebarPopUp">
            <div className="popUpText" onClick={handleBottomLinkClickProfile}>
              Profile
            </div>
            <div className="popUpText" onClick={handleBottomLinkClickLogOut}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
