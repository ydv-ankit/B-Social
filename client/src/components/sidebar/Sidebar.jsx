import HomeIcon from '@mui/icons-material/Home';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { BookmarkBorderOutlined, MoreHorizOutlined, PeopleOutlined, PersonOutlineOutlined, Search } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TableRowsIcon from '@mui/icons-material/TableRows';

import './sidebar.css';

export default function Sidebar() {
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
                            <div className="sidebarLinkText homeLink">
                                Home
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg">
                                <Search />
                            </div>
                            <div className="sidebarLinkText">
                                Explore
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg">
                                <NotificationsNoneIcon />
                            </div>
                            <div className="sidebarLinkText">
                                Notifications
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg">
                                <MailOutlineIcon />
                            </div>
                            <div className="sidebarLinkText">
                                Messages
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg">
                                <TableRowsIcon />
                            </div>
                            <div className="sidebarLinkText">
                                Lists
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg">
                                <BookmarkBorderOutlined />
                            </div>
                            <div className="sidebarLinkText">
                                Bookmarks
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg">
                                <PeopleOutlined />
                            </div>
                            <div className="sidebarLinkText">
                                Communities
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg">
                                <PersonOutlineOutlined />
                            </div>
                            <div className="sidebarLinkText">
                                Profile
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkContent">
                            <div className="sidebarImg moreImg">
                                <MoreHorizOutlined />
                            </div>
                            <div className="sidebarLinkText">
                                More
                            </div>
                        </div>
                    </div>
                    <div className="sidebarLinks">
                        <div className="sidebarLinkText postText">
                            Post
                        </div>
                    </div>
                </div>
                <div className="sidebarBottomLinks">
                    <div className="profileLeft">
                        <div className="profileImg">
                            <img src="assets/icons/twitter-x.png" alt="" />
                        </div>
                        <div className="profileText">
                            <div className="profileName">
                                Ankit Ydv
                            </div>
                            <div className="profileUsername">
                                @ydvtwts
                            </div>
                        </div>
                    </div>
                    <div className="moreOptions">
                        <MoreHorizOutlined />
                    </div>
                </div>
            </div>
        </div>
    )
} 
