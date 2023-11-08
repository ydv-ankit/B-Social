import { useEffect, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Rightbar from '../../components/rightbar/Rightbar'
import Loader from '../../components/loader/Loader'
import { getUserId } from '../../utils/cookies'
import FollowingsPage from '../../components/followingsPage/FollowingsPage'

const FollowingsSection = () => {
  return (
    <>
      <FollowingsPage />
    </>
  )
}

export default FollowingsSection