import { useEffect } from 'react';
import Newpost from '../Newpost/Newpost';
import Posts from '../Posts/Posts';
import { getStoredCookies } from '../../utils/cookies';
import { useNavigate } from 'react-router-dom';

import './home.css'

export default function Home() {

    const navigate = useNavigate();


    useEffect(() => {
        const cookies = getStoredCookies()
        const regex = /userId=([^',]+)/;

        let userId = null;

        // Loop through the array and extract userId values
        cookies.forEach(item => {
            const match = item.match(regex);
            if (match) {
                // Push the matched userId value into the array
                userId = match[1];
            }
        });

        if (userId === null) {
            navigate("/login");
        }
    }, [navigate])

    return (
        <div className="home">
            <div className="homeWrapper">
                <div className="homeHead">
                    <div className="homeHeadText">Home</div>
                </div>
                <div className="homeTopbar">
                    <div className="homeForyou">
                        For you
                    </div>
                    <div className="homeFollowing">
                        Following
                    </div>
                </div>
            </div>
            <div className="homeNewPostContainer">
                <Newpost />
            </div>
            <Posts />
        </div>
    )
}
