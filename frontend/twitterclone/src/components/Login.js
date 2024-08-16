import React, { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "../utils/constant";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getUser } from "../redux/userSlice";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [Username, setUsername] = useState("");
  //(I got error here like 401 unauthorized because Username is smallletter in here the above line but in our backend usercontroller there is "U was capital so in here i did the also capital and its gonna work")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (isLogin) {
      //login
      try {
        const res = await axios.post(`${USER_API_END_POINT}/login`, {email,password},{
          headers:{
            'Content-Type':"application/json"
          },
            withCredentials:true
        
        });
        dispatch(getUser(res?.data?.user));
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
          //(message from toast style is not showing because you are forget to write res.data.message)
          //main.4fcd853b08d85323bf42.hot-update.js:68 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading 'data')
         //this is because you forget to run backend 
        }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    } else {
      //signup
      try {
        const res = await axios.post(`${USER_API_END_POINT}/register`, {name,Username,email,password},{
          headers:{
            "Content-Type":"application/json"
          },
            withCredentials:true
        });
       if(res.data.success){
             setIsLogin(true);
             toast.success(res.data.message);
       }
      } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
      }
    }
  }

  const LoginSignupHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div className="sm:w-[50px] mt-0 justify-center lg:w-[200px] justify-center ">
          <img
            className="ml-5rem sm:w-[170px] sm:my-12 md:w-[200px] lg:w-[270px]"
            width={"300px"}
            src="https://freepnglogo.com/images/all_img/1691832278twitter-x-logo-png.png"
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className="my-4">
            <h1 className="font-bold text-5xl">Happening now</h1>
          </div>
          <h1 className=" mt-4 mb-2 font-bold text-2xl">
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form onSubmit={submitHandler} className="flex flex-col w-[70%]">
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="outline-blue-500 border sm:w-[150px] md:w-[200px] lg:w-[220px] lg:text-lg border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
                <input
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your Username"
                  className="outline-blue-500 border sm:w-[150px] md:w-[200px] lg:w-[220px] lg:text-lg  border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
                />
              </>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className=" w-[170px] sm:w-[150px] text-sm md:w-[200px] lg:text-lg lg:w-[220px] outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your Password"
              className=" w-[170px] sm:w-[150px] text-sm md:w-[200px] lg:text-lg lg:w-[220px] outline-blue-500 border border-gray-800 px-3 py-2 rounded-full my-1 font-semibold"
            />
            <button className=" w-[170px] sm:w-[150px] text-sm md:w-[200px] lg:text-lg lg:w-[220px]  bg-[#1D9BF0] border-none rounded-full my-4 py-2 text-lg text-white">
              {isLogin ? "Login" : "Create Account"}
            </button>
            <h1>
              {isLogin
                ? "Don't have an account ? "
                : "Already have an account ?"}{" "}
              <span
                onClick={LoginSignupHandler}
                className="font-bold text-blue-600 sm:text-sm lg:text-lg cursor-pointer"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
