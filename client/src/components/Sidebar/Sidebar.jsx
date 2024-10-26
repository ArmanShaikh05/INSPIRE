import "./sidebar.scss";
import { Avatar } from "../../assets";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlinePlus,
  HiOutlineUsers
} from "react-icons/hi2";
import { FaFileCircleCheck } from "react-icons/fa6";
import { PiRanking } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss"
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "../ui/button";
import CreatePost from "../CreatePost";
import { toast } from "sonner";
import axios from "axios";
import { setAuthUser } from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true });
      console.log('error')
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
      console.log('error')
    } catch (error) {
      console.log(error)
      toast.error(error);
    }
  };

  const sidebarHandler = (textType) => {
    if (textType === 'Logout') {
      logoutHandler();
    } else if (textType === 'Create') {
      setOpen(true);
    } else if (textType === 'Profile') {
      navigate(`/profile/${user?._id}`);
    } else if (textType === 'Home') {
      navigate("/");
    } else if (textType === 'Messages') {
      navigate("/chat");
    } else if (textType === 'Search') {
      navigate("/search"); // Navigate to search page
    }
  };
  const path = window.location.pathname.split("/")[1];
  return (
    <div className="StyledSidebar bg-gray-200">
      <div className="StyledLogo">
        <img className="Img" src={Avatar} alt="Avatar" />
        <h3>Inspire</h3>
      </div>

      <ul className="NavList">
        <li onClick={() => sidebarHandler("Home")}>
          <div className={`StyledNavLink ${path === "" ? "active" : ""}`}>
            <HiOutlineHome />
            <span>Home</span>
          </div>
        </li>
        <li onClick={() => sidebarHandler("Messages")}>
          <div className={`StyledNavLink ${path === "chat" ? "active" : ""}`}>
            <HiOutlineCalendarDays />
            <span>Chat</span>
          </div>
        </li>
        <li onClick={() => sidebarHandler("Profile")}>
          <div className={`StyledNavLink ${path.startsWith("profile") ? "active" : ""}`}>
            <HiOutlineCalendarDays />
            <span>Profile</span>
          </div>
        </li>
        
        <li>
          <div className={`StyledNavLink ${path === "users" ? "active" : ""}`} onClick={() => navigate("/users")}>
            <HiOutlineUsers />
            <span>Users</span>
          </div>
        </li>
        <li>
          <div
            className={`StyledNavLink ${path === "approvals" ? "active" : ""}`}
            onClick={() => navigate("/approvals")}
          >
            <FaFileCircleCheck />
            <span>Approvals</span>
          </div>
        </li>
        <li>
          <div
            className={`StyledNavLink ${path === "rankings" ? "active" : ""}`}
            onClick={() => navigate("/rankings")}
          >
            <PiRanking />
            <span>Rankings</span>
          </div>
        </li>
        
        <li onClick={() => window.location.href = 'http://localhost:3001'}>
            <span>Meeting</span>
        </li>
        <li>
          <Link className="StyledNavLink" to={"/account/edit"}>
            <HiOutlineCalendarDays />
            <span>Edit Profile</span>
          </Link>
        </li>
        <li onClick={() => sidebarHandler("Logout")}>
          <Link className="StyledNavLink" to="#">
            <HiOutlineCog6Tooth />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
      {likeNotification.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" className="rounded-full h-5 w-5 bg-red-600 hover:bg-red-600">
              <HiOutlineBell /> {likeNotification.length}
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div>
              {likeNotification.length === 0 ? (
                <p>No new notifications</p>
              ) : (
                likeNotification.map((notification) => (
                  <div key={notification.userId} className="flex items-center gap-2 my-2">
                    <img src={notification.userDetails?.profilePicture} alt="Profile" className="w-6 h-6 rounded-full" />
                    <p className="text-sm">
                      <span className="font-bold">{notification.userDetails?.username}</span> liked your post
                    </p>
                  </div>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      )}

      {/* Create Post Button */}
      <Button onClick={() => setOpen(true)}>
        <HiOutlinePlus /> Create Post
      </Button>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidebar;
