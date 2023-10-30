import './main.css';
import Home from '../Home/Home';
import Sidebar from '../sidebar/Sidebar';
import Rightbar from '../rightbar/Rightbar';
import { useEffect, useState } from 'react';
import { getUserId, removeCookies } from '../../utils/cookies';
import Loader from '../loader/Loader';

let userDetails = [];
const Main = () => {
    const [userPosts, setUserPosts] = useState([]);
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
    const handleGetPosts = async () => {
        const userId = getUserId();

        try {
            const resp = await fetch(process.env.REACT_APP_SERVER_URI + "posts/all/" + userId);
            const posts = await resp.json();

            let userIds = [];
            posts.posts.forEach((element) => {
                userIds.push(element.userId);
            });

            // Remove duplicates
            const data = [...new Set(userIds)];

            // Create an array of promises for fetch requests
            const fetchPromises = data.map(async (id) => {
                const resp = await fetch(process.env.REACT_APP_SERVER_URI + "users/id/" + id);
                const get_resp_data = await resp.json();
                userDetails.push(get_resp_data.data);
            });

            // Wait for all fetch requests to complete
            await Promise.all(fetchPromises);
            setUserPosts(posts.posts);
        } catch (err) {
            console.log("error fetching posts...", err);
        }
    }

    useEffect(() => {
        getUserData();
        handleGetPosts();
    }, [])

    if (!userData || !userPosts || !userDetails) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <Sidebar userData={userData} />
            <Home
                posts={userPosts}
                userDetails={userDetails}
                userData={userData}
            />
            <Rightbar />
        </>
    )
}

export default Main