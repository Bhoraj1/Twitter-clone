import React from "react";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import {Link} from "react-router-dom";

const RightSidebar = ({otherUsers}) => {
  return (
    <div className="w-[28%] sm:col-span-2 sm:block hidden">
      <div className="flex item center p-2 mt-1 bg-gray-100 rounded-full outline-none">
        <CiSearch className="mt-1" />
        <input
          type="text"
          className="outline-none px-2 bg-transparent"
          placeholder="Search"
        />
      </div>
      <div className="p-5 bg-gray-100 mt-4 rounded-2xl">
        <h1 className="font-bold text-lg">Who to follow</h1>
        {
          otherUsers?.map((user)=>{
            return(
              <div key={user?._id} className="flex justify-between my-3">
              <div className="flex">
                <div>
                  <Avatar
                    src="https://pbs.twimg.com/profile_images/1713708630925565952/8rXStIIT_400x400.png"
                    size="40"
                    round={true}
                  />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold">{user?.name}</h1>
                  <p className="text-sm">{`@${user?.Username}`}</p>
                </div>
              </div>
              <div>
                <Link to={`/profile/${user?._id}`}>
                <button className="px-5 py-1 bg-black rounded-full text-white">
                  Profile
                </button>
                </Link>
              </div>
            </div>

            )
          })
        }


      </div>
    </div>
  );
};

export default RightSidebar;
