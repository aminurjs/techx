import { NavLink, Outlet } from "react-router-dom";
import "./menu.css";

const Dashboard = () => {
  return (
    <div className="flex max-w-7xl mx-auto border-t border-gray-200 flex-col lg:flex-row">
      <div className="lg:w-1/5 bg-white">
        <div className="p-2 flex flex-row lg:flex-col gap-3">
          <NavLink
            to="/dashboard"
            className="w-full  py-3 px-5 text-gray-900 text-left text-lg font-medium hover:bg-gray-200 duration-500 flex items-center gap-3"
          >
            <span>All Posts</span>
          </NavLink>
          <NavLink
            to="/dashboard/add-post"
            className="w-full  py-3 px-5 text-gray-900 text-left text-lg font-medium hover:bg-gray-200 duration-500 flex items-center gap-3"
          >
            <span>Add Post</span>
          </NavLink>
        </div>
      </div>
      <div className="w-full bg-slate-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
