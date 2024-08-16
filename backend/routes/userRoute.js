import express from "express";
import { Login, Register,logout,bookmark, getMyProfile, getOtherUsers, follow, unfollow} from "../controllers/userControllers.js";
import isAuthenticated from "../config/auth.js";

//(is not defined becaue use need to import properly)
const router = express.Router();
router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated,bookmark);
router.route("/profile/:id").get(isAuthenticated,getMyProfile);
router.route("/otherusers/:id").get(isAuthenticated,getOtherUsers);
router.route("/follow/:id").post(isAuthenticated,follow);
router.route("/unfollow/:id").post(isAuthenticated,unfollow);

export default router;