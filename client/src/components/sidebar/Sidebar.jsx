import './sidebar.css';

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarContents">
                    <div className="sidebarLink">
                        Home
                    </div>
                    <div className="sidebarLink">
                        Explore
                    </div>
                    <div className="sidebarLink">
                        Messages
                    </div>
                    <div className="sidebarLink">
                        Notifications
                    </div>                    
                </div>
            </div>
        </div>
    )
}