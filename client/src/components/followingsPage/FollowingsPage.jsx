import './followingsPage.css';
import { useEffect, useState } from 'react';
import UserList from '../userList/UserList';
import Loader from '../loader/Loader';
import { useParams } from 'react-router-dom';

const FollowingsPage = () => {
    const { userProfileId } = useParams();
    const [userFollowingData, setUserFollowingData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getFollowings = async () => {
        await fetch(process.env.REACT_APP_SERVER_URI + "users/get/followings/" + userProfileId)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setIsLoading(false);
                setUserFollowingData(data.followingsData);
            })
            .catch((err) => {
                setIsLoading(false);
                console.log(err);
            })
    }

    useEffect(() => {
        getFollowings();
    }, [])

    if (isLoading) {
        return (
            <div className="toCenterLoader">
                <Loader />
            </div>
        )
    }

    return (
        <div className="followings">
            <div className="followingsWrapper">
            <div className="followingsPageTop">
                    Followings
                </div>
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