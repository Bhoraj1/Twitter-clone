import React from 'react'
import { IoMdArrowBack } from "react-icons/io";
import {Link,useParams} from "react-router-dom";
import Avatar from "react-avatar";
import useGetProfile from '../hooks/useGetProfile'
import {useSelector,useDispatch} from "react-redux"
import { USER_API_END_POINT } from '../utils/constant';
import axios from "axios";
import toast from "react-hot-toast";
import { followingUpdate } from '../redux/userSlice';


const Profile = () => {
    const {user,profile} = useSelector(store=>store.user);
    const {id} = useParams();
    useGetProfile(id)
const dispatch = useDispatch();

    const followAndUnfollow = async () =>{
       if(user.following.includes(id)){
        //unfollow
        try {

            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`,{id:user?._id});
             console.log(res);
             dispatch(followingUpdate(id));
             toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            
        }
       }else{
        //follow
        try {

            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`,{id:user?._id});
             console.log(res);
             dispatch(followingUpdate(id));
             toast.success(res.data.message);

        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
            
        }
       }
    }

  return (
    <div className='w-[50%] border-l border-r border-gray-200'>
     <div>
        <div className='flex items-center py-2'>
            <Link to= "/" className='p-2 rounded-full hover:bg-gray-200 hover:cursor-pointer'>
                <IoMdArrowBack size={"24px"}/>
            </Link>
            <div className='mx-3'>
            <h1 className='font-bold text-lg'>{profile?.name}</h1>
            <p className='text-sm text-gray-500'>0 posts</p>
            </div>
        </div>
        <img src="https://pbs.twimg.com/profile_banners/1713708442001555456/1712157404/1500x500" alt='bg' img/>
        <div className='absolute top-52 ml-3 rounded-full border-4 border-white'>
        <Avatar
            src="https://pbs.twimg.com/profile_images/1713708630925565952/8rXStIIT_400x400.png"
            size="120"
            round={true}
          /> 
        </div>
        <div className='text-right m-4'>
            {
                profile?._id === user?._id ? (
                    <button className=' px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400 '>Edit Profile</button>
                ) :(
                    <button onClick={followAndUnfollow} className=' px-4 py-1 bg-black text-white rounded-full border border-gray-400 '>{user.following.includes(id) ? "following" : "follow"}</button>
                )
            }
           
        </div>
        <div className='mt-8 ml-4'>
            <h1 className='font-bold text-xl'>{profile?.name}</h1>
            <p>{`@${profile?.Username}`}</p>
        </div>
        <div className='m-4 text-sm'>
            <p>Hello Everyone Welcome to my Twitter(x) Profile
                here you can see my all details. 
            </p>
        </div>
     </div>
    </div>
  )
}

export default Profile
