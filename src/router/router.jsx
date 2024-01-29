import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import Favorite from "../pages/favorite/Favorite";
import PostDetails from "../pages/postDetails/PostDetails";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AddPost from "../pages/dashboard/AddPost";
import EditPost from "../pages/dashboard/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/favorites", element: <Favorite /> },
      { path: "/post/:id", element: <PostDetails /> },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          { path: "/dashboard/add-post", element: <AddPost /> },
          { path: "/dashboard/edit-post/:id", element: <EditPost /> },
        ],
      },
    ],
  },
]);
export default router;
