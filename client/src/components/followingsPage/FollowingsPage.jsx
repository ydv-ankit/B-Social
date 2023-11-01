import { useEffect, useState } from 'react';
import './followingsPage.css';
import { getUserId } from '../../utils/cookies';
import UserList from '../userList/UserList';

const FollowingsPage = () => {

    const [userFollowingData, setUserFollowingData] = useState();

    const getFollowings = async () => {
        await fetch(process.env.REACT_APP_SERVER_URI + "users/get/followings/" + getUserId())
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
                    !userFollowingData
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