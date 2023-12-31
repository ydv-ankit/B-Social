import { useNavigate } from 'react-router-dom';
import './userList.css'

const UserList = ({ data }) => {
    const navigate = useNavigate();

    function handleProfileClick() {
        navigate('/profile/' + data.firebaseUserId);
    }

    return (
        <div className="userList">
            <div className="userListWrapper" onClick={handleProfileClick}>
                <div className="profileImg">
                    <div className="userListUserDetails">
                        <img src={data.profilePicture} alt="" />
                        <div className='userListUserDetailsHover'>
                            <span className="userListUserFullname">
                                {data.fullname}
                            </span>
                            <span className="userListUserUsername">
                                @{data.username}
                            </span>
                            <span className="userListUserDetailsSeperator">.</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserList