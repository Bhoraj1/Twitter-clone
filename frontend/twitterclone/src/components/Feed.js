import React from 'react'
import Createpost from './Createpost'
import Twitt from './Twitt'
import {useSelector} from "react-redux"

const Feed = ()=> {
  const {tweets} = useSelector(store=>store.tweet);
  return (
    <div className='w-[50%] border border-gray-200'>
      <div>
      <Createpost/>
      {
        tweets?.map((tweet)=><Twitt key ={tweet?._id} tweet={tweet}/> )
      }
 
        </div>
    </div>
  )
}

export default Feed
