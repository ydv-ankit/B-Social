import { useEffect, useState } from 'react'
import { getUserId } from '../../utils/cookies';
import Sidebar from '../../components/sidebar/Sidebar'
import Explore from '../../components/explore/Explore'
import Rightbar from '../../components/rightbar/Rightbar';

const ExploreSection = () => {
    return (
        <>
            <Explore />
        </>
    )
}

export default ExploreSection