import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Outlet, useNavigate } from "react-router-dom";
import "./dashboard.scss";

const Dashboard = () => {
  const path = window.location.pathname.split("/")[2]
  const navigate = useNavigate()
  return (
    <div className="dashboard-container">
      <div className="dashboard-headers">
        <DashboardHeader />
      </div>

      <div className="flex gap-4 space-x-2 p-2 w-max h-[4rem] rounded-[8px] mb-4 mt-[1rem]">
          <Button
            variant={(path !== "institue" && path !== "alumini") ? "default" : "outline"}
            className="px-4 py-2 h-full text-[1rem] font-[550] w-[12rem]"
            onClick={() => {
              navigate("");
            }}
          >
            Universities
          </Button>
          <Button
            variant={path === "institue" ? "default" : "outline"}
            className="px-4 py-2 h-full text-[1rem] font-[550] w-[12rem]"
            onClick={() => {
              navigate("institue");
            }}
          >
            Institutes
          </Button>
          <Button
            variant={path === "alumini" ? "default" : "outline"}
            className="px-4 py-2 h-full text-[1rem] font-[550] w-[12rem]"
            onClick={() => {
              navigate("alumini");
            }}
          >
            Alumini
          </Button>
        </div>

      <div className="dashboard-tables">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
