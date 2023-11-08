import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import FollowersPage from '../../components/followersPage/FollowersPage'
import Rightbar from '../../components/rightbar/Rightbar'
import Loader from '../../components/loader/Loader'
import { getUserId } from '../../utils/cookies'

const FollowersSection = () => {
  return (
    <>
      <FollowersPage />
    </>
  )
}

export default FollowersSection