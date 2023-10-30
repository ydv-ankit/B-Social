import HomeIcon from "@mui/icons-material/Home";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  BookmarkBorderOutlined,
  MoreHorizOutlined,
  PeopleOutlined,
  PersonOutlineOutlined,
  Search,
} from "@mui/icons-material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useNavigate } from 'react-router-dom';
import { getUserId, removeCookies } from '../../utils/cookies';

import "./sidebar.css";

export default function Sidebar({ userData }) {
  const navigate = useNavigate();

  function handleBottomLinkClickLogOut(e) {
    document.getElementById("sidebarPopUp").style.display = "none";
    removeCookies("userId");
    navigate("/");
  }

  function handleBottomLinkClickProfile(e) {
    document.getElementById("sidebarPopUp").style.display = "none";
    navigate("/profile");
  }

  function handleProfileClick(e) {
    document.getElementById("sidebarPopUp").style.display === "none"
      ? document.getElementById("sidebarPopUp").style.display = "block"
      : document.getElementById("sidebarPopUp").style.display = "none";
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarContents">
          <div className="sidebarLogo">
            <img src="assets/icons/twitter-x.svg" alt="Twitter" />
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <HomeIcon />
              </div>
              <div className="sidebarLinkText" onClick={() => navigate('/home')}>Home</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <Search />
              </div>
              <div className="sidebarLinkText" onClick={() => navigate('/explore')}>Explore</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <NotificationsNoneIcon />
              </div>
              <div className="sidebarLinkText" onClick={() => navigate('/notifications')}>Notifications</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <MailOutlineIcon />
              </div>
              <div className="sidebarLinkText" onClick={() => navigate('/messages')}>Messages</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <TableRowsIcon />
              </div>
              <div className="sidebarLinkText">Lists</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <BookmarkBorderOutlined />
              </div>
              <div className="sidebarLinkText" onClick={() => navigate('/bookmarks')}>Bookmarks</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <PeopleOutlined />
              </div>
              <div className="sidebarLinkText">Communities</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg">
                <PersonOutlineOutlined />
              </div>
              <div className="sidebarLinkText" onClick={() => navigate('/profile/' + getUserId())}>Profile</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkContent">
              <div className="sidebarImg moreImg">
                <MoreHorizOutlined />
              </div>
              <div className="sidebarLinkText">More</div>
            </div>
          </div>
          <div className="sidebarLinks">
            <div className="sidebarLinkText postText" onClick={() => navigate('/newpost')}>Post</div>
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
                <div className="profileUsername">{userData && userData.username}</div>
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
