import {createBrowserRouter,} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProfileLayout from "../layouts/ProfileLayout.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx"
import Info from "../Pages/Info.jsx"
import RedirectSearch from "../Pages/RedirectSearch.jsx"
import TutorSearch from "../Components/TutorSearch.jsx";
import FriendSearch from "../Components/FriendSearch.jsx";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path:"/register",
      element: <Register />
    },
    {
      path:"/home",
      element: <HomeLayout />
    },
    {
        path:"/profile",
        element: <ProfileLayout />
    },
    {
      path:"/info",
      element: <Info />
    },
    {
        path:"/redirectsearch",
        element: <RedirectSearch />
    },
    {
        path:"/tutorSearch",
        element: <TutorSearch />
    },
    {
        path:"/friendsearch",
        element: <FriendSearch />
    }
  ]);
