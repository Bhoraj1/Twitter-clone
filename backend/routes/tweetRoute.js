import express from "express";
//does not provide an export name ".." error because You need to check the import method 
//like {..} ...
import {GetAllTweet, GetfollowingTweet, LikeOrDislikes, createTweet,deleteTweet} from "../controllers/tweetController.js"
import isAuthenticated from "../config/auth.js";
//(is not defined becaue use need to import properly)
const router = express.Router();
router.route("/create").post(isAuthenticated, createTweet);
router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated,deleteTweet);
router.route("/like/:id").put(isAuthenticated,LikeOrDislikes);
router.route("/alltweets/:id").get(isAuthenticated,GetAllTweet);
router.route("/followingtweets/:id").get(isAuthenticated,GetfollowingTweet);
export default router;