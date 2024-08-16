import React from 'react'
import { IoMdHome } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineLogout } from "react-icons/ai";
import {Link,useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { getMyProfile, getOtherUsers, getUser } from '../redux/userSlice';

const LeftSidebar = ()=> {
    const {user} = useSelector(store=>store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutHandler = async ()=>{
        try {

            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUsers(null));
            dispatch(getMyProfile(null));
           navigate('/login');
            toast.success(res.data.message);
            
        } catch (error) {
            toast.success(error.response.data.message);
            console.log(error);
            
        }

    }
  return (
    <div className='w-[20%] sm:col-span-2 sm:block hidden'>
        <div>
            <div>
                <img className = 'ml-4'  width = {"25px"} src="https://freepnglogo.com/images/all_img/1691832278twitter-x-logo-png.png" alt = "twitter-logo" />
            </div>
            <div className='my-4'>
                <Link to = "/" className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                    <IoMdHome size = "24px"/> 
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Home</h1>
                </Link>
                 
                <div className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                    <CiSearch size = "24px"/> 
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Explore</h1>
                </div>

                <div className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                    <IoIosNotificationsOutline size = "24px"/> 
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Notification</h1>
                </div>

                <Link to = {`/profile/${user?._id}`} className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                    <CiUser size = "24px"/> 
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Profile</h1>
                </Link>

                <div className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                    <CiBookmark size = "24px"/> 
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Bookmarks</h1>
                </div>

                <div onClick={logoutHandler} className = 'flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'>
                    <div>
                    <AiOutlineLogout size = "24px"/> 
                    </div>
                    <h1 className='font-bold text-lg ml-2'>Log out</h1>
                </div>
                <button className='px-4 py-2 ml-2 border-none text-md bg-[#1D9BF0] w-[75%] rounded-full font-bold text-white'>Post</button>

 
            </div>
        </div>
      
    </div>
  )
}

export default LeftSidebar
