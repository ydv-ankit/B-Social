import Sidebar from '../../components/sidebar/Sidebar'
import PostPreview from '../../components/PostPreview/PostPreview'
import Rightbar from '../../components/rightbar/Rightbar'
import Loader from '../../components/loader/Loader'
import { getUserId } from '../../utils/cookies'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const PostPreviewSection = () => {
    const { userId, postId } = useParams();
    const [userPostData, setUserPostData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [userDetails, setUserDetails] = useState(null);

    // postPreview data
    async function getUserDetails(userIdData) {
        await fetch(process.env.REACT_APP_SERVER_URI + 'users/id/' + userId)
            .then((resp) => {
                return resp.json()
            })
            .then((data) => {
                setUserDetails(data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    const handleGetPosts = async () => {
        await fetch(process.env.REACT_APP_SERVER_URI + 'post/get/' + postId)
            .then((resp) => {
                return resp.json();
            }).then((data) => {
                setUserPostData(data);
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        handleGetPosts();
        getUserDetails();
    }, [])

    if (!userPostData || !userDetails) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <PostPreview userPostDetails={userDetails} userPostData={userPostData} />
        </>
    )
}

export default PostPreviewSection