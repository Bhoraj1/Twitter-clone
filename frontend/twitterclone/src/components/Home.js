import React,{useEffect} from 'react'
import LeftSidebar from './LeftSidebar'
import RightSidebar from './RightSidebar'
import { Outlet,useNavigate} from 'react-router-dom'
import useOtherUsers from '../hooks/useOtherusers'
import {useSelector} from "react-redux"
import useGetMyTweets from '../hooks/useGetMyTweets'

const Home = () => {
 const {user,otherUsers} = useSelector(store=>store.user);
  useOtherUsers(user?._id);
  useGetMyTweets(user?._id);
  const navigate = useNavigate();

  useEffect(() =>{
    if(!user){
      navigate("/login");
    }
  },[]);

  return (
    <div className='flex justify-between w-[90%] mx-auto sm:grid-cols-12'>
        <LeftSidebar />
        <Outlet />
        <RightSidebar  otherUsers={otherUsers}/>
    </div>
  )
}

export default Home
