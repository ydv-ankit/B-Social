import './followersPage.css';
import { useEffect, useState } from 'react';
import UserList from '../userList/UserList';
import { useParams } from 'react-router-dom';

const FollowersPage = () => {
    const { userProfileId } = useParams();
    const [userFollowersData, setUserFollowersData] = useState([]);

    const getFollowers = async () => {
        await fetch(process.env.REACT_APP_SERVER_URI + "users/get/followers/" + userProfileId)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setUserFollowersData(data.followersData);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getFollowers();
    }, [])

    return (
        <div className="followers">
            <div className="followersWrapper">
                <div className="followersPageTop">
                    Followers
                </div>
                {
                    userFollowersData && userFollowersData.length === 0
                        ? <div className="nodata">No Followers</div>
                        : userFollowersData && userFollowersData.map((element, _) => (
                            <UserList key={_} data={element} />
                        ))
                }
            </div>
        </div>
    )
}

export default FollowersPage