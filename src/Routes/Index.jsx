import {createBrowserRouter,} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProfileLayout from "../layouts/ProfileLayout.jsx";
import HomeLayout from "../layouts/HomeLayout.jsx"
import Info from "../Pages/Info.jsx"
import RedirectSearch from "../Pages/RedirectSearch.jsx"
import SearchTutor from "../Pages/SearchTutor.jsx";
import SearchFriend from "../Pages/SearchFriend.jsx";

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
        path:"/searchtutor",
        element: <SearchTutor />
    },
    {
        path:"/searchfriend",
        element: <SearchFriend />
    }
  ]);
