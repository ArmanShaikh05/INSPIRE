import { Avatar } from "@/assets"
import { FaFileCircleCheck } from "react-icons/fa6";
import {
  HiOutlineCog6Tooth,
  HiOutlineHome
} from "react-icons/hi2";
import { PiRanking } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.scss"

const Sidebar = () => {
  const path = window.location.pathname.split("/")[1];
  const navigate = useNavigate();
  return (
    <div className="StyledSidebar bg-gray-200">
      <div className="StyledLogo">
        <img className="Img" src={Avatar} alt="Avatar" />
        <h3>Inspire</h3>
      </div>

      <ul className="NavList">
        <li>
          <div
            className={`StyledNavLink ${path === "dashboard" ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            <HiOutlineHome />
            <span>Home</span>
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

        <li>
          <Link className="StyledNavLink" to={"/settings"}>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar