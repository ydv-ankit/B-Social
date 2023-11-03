import './followingsPage.css';
import { useEffect, useState } from 'react';
import UserList from '../userList/UserList';

const FollowingsPage = ({ userProfileId }) => {

    const [userFollowingData, setUserFollowingData] = useState([]);
    console.log(userFollowingData);

    const getFollowings = async () => {
        await fetch(process.env.REACT_APP_SERVER_URI + "users/get/followings/" + userProfileId)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUserFollowingData(data.followingsData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getFollowings();
    }, [])

    return (
        <div className="followings">
            <div className="followingsWrapper">
                {
                    userFollowingData && userFollowingData.length === 0
                        ? <div className="nodata">No Followings</div>
                        : userFollowingData && userFollowingData.map((element, _) => (
                            <UserList key={_} data={element} />
                        ))
                }
            </div>
        </div>
    )
}

export default FollowingsPage