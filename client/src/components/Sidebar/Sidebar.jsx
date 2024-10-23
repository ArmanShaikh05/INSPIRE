import "./sidebar.scss";
import { Avatar } from "../../assets";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers

} from "react-icons/hi2";
import { FaFileCircleCheck } from "react-icons/fa6";
import { PiRanking } from "react-icons/pi";
import { HiOutlineSearch, HiOutlineBell, HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { setAuthUser } from "../../redux/authSlice";
import { setPosts, setSelectedPost } from "../../redux/postSlice";
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import CreatePost from '../CreatePost';

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { likeNotification } = useSelector((store) => store.realTimeNotification);
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/user/logout', { withCredentials: true });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        dispatch(setSelectedPost(null));
        dispatch(setPosts([]));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
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
      navigate("/search");
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
        <li onClick={() => sidebarHandler("Search")}>
          <div className={`StyledNavLink ${path === "search" ? "active" : ""}`}>
            <HiOutlineSearch />
            <span>Search</span>
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
          <div className={`StyledNavLink ${path === "bookings" ? "active" : ""}`} onClick={() => navigate("/bookings")}>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </div>
        </li>
        <li>
          <div className={`StyledNavLink ${path === "cabins" ? "active" : ""}`} onClick={() => navigate("/cabins")}>
            <HiOutlineHomeModern />
            <span>Cabins</span>
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
        <li onClick={() => navigate("/settings")}>
          <div className={`StyledNavLink ${path === "settings" ? "active" : ""}`}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </div>
        </li>
        <li onClick={() => sidebarHandler("Logout")}>
          <div className="StyledNavLink">
            <HiOutlineCog6Tooth />
            <span>Logout</span>
          </div>
        </li>
      </ul>

      {/* Notifications Button */}
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
      <Button onClick={() => setOpen(true)} className="mt-4">
        <HiOutlinePlus /> Create Post
      </Button>

      <CreatePost open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidebar;
