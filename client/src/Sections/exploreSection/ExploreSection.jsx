import { useEffect, useState } from 'react'
import { getUserId } from '../../utils/cookies';
import Sidebar from '../../components/sidebar/Sidebar'
import Explore from '../../components/explore/Explore'
import Rightbar from '../../components/rightbar/Rightbar';

const ExploreSection = () => {
    const [userData, setUserData] = useState();

    async function getUserData() {
        await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + getUserId())
            .then((tmp) => {
                return tmp.json();
            }).then((data) => {
                setUserData(data.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getUserData();
    })

    return (
        <>
            <Sidebar userData={userData} />
            <Explore />
            <Rightbar />
        </>
    )
}

export default ExploreSection