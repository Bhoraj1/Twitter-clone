import React ,{useState} from "react";
import Avatar from "react-avatar";
import { FaImages } from "react-icons/fa";
import axios from "axios";
import { TWEET_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useDispatch, useSelector,} from "react-redux"
import { getIsActive, getRefresh } from "../redux/tweetSlice";

const Createpost = () => {
  const [description, setDescription] = useState("");
  const {user} = useSelector(store=>store.user);
  const {isActive} = useSelector(store=>store.tweet);
  const dispatch = useDispatch();
  const submitHandler = async() => {
    try {
      
      const res = await axios.post(`${TWEET_API_END_POINT}/create`,{description,id:user?._id},{

        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      
      });
      dispatch(getRefresh());
      if(res.data.success){
        toast.success(res.data.message);
        console.log(res);
      }
      
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
      
    }
    setDescription("");

  }
  const foryouHandler =()=>{
    dispatch(getIsActive(true));
    
  }
  const followingHandler = ()=>{
    dispatch(getIsActive(false));
    
  }
  return (
    <div className="w-[100%] sm:col-span-8">
      <div>
        <div className="flex items-center justify-evenly border-b border-gray-200">
          <div onClick={foryouHandler} className={`${isActive ? "border-b-4 border-blue-600": "border-b-4 border-transparent"} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg">For you</h1>
          </div>
          <div onClick={followingHandler} className= {`${!isActive ? "border-b-4 border-blue-600": "border-b-4 border-transparent"} cursor-pointer  hover:bg-gray-200 w-full text-center  px-4 py-3`}>
            <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          </div>
        </div>
        <div>
          <div className="flex items-center p-4">
            <div>
            <Avatar src="https://pbs.twimg.com/profile_images/1713708630925565952/8rXStIIT_400x400.png" size="40" round={true} />
            </div>
            <input value = {description} onChange={(e)=> setDescription(e.target.value)} className="w-full outline-none border-none ml-2 text-xl" type="text" placeholder="What is happening?!"/>
          </div>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div>
              <FaImages size="24px" />
            </div>
            <button onClick={submitHandler} className="bg-[#1D9BF0] px-4 py-1 text-white border-none rounded-full text-right">Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Createpost;
