import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/home";
import Favorite from "../pages/favorite/Favorite";
import PostDetails from "../pages/postDetails/PostDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/favorites", element: <Favorite /> },
      { path: "/post/:id", element: <PostDetails /> },
    ],
  },
]);
export default router;
