import './main.css';
import Home from '../../components/Home/Home';
import Sidebar from '../../components/sidebar/Sidebar';
import Rightbar from '../../components/rightbar/Rightbar';
import { useEffect, useState } from 'react';
import { getUserId } from '../../utils/cookies';
import Loader from '../../components/loader/Loader';

let userDetails = [];
const Main = () => {
    const [userPosts, setUserPosts] = useState([]);
    const [userData, setUserData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const userId = getUserId();

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
        try {
            const resp = await fetch(process.env.REACT_APP_SERVER_URI + "posts/all/" + getUserId());
            const posts = await resp.json();

            let userIds = [];
            posts.posts.forEach((element) => {
                if (element.userId !== userId) {
                    userIds.push(element.userId);
                }
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
            setIsLoading(false);
        } catch (err) {
            console.log("error fetching posts...", err);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUserData();
        handleGetPosts();
    }, [])

    if (isLoading) {
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