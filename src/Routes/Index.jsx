import {createBrowserRouter} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ProfileLayout from "../layouts/ProfileLayout.jsx";
import SearchTutor from "../Pages/SearchTutor.jsx";
import SearchFriend from "../Pages/SearchFriend.jsx";
import Welcome from "../Pages/Welcome.jsx";
import CreateProfile from "../Components/common/EditProfile/createProfile.jsx";
import Chat from "../Components/common/Chat/chat.jsx"
import HomeLayout from "../layouts/HomeLayout.jsx";
import DisplayAllChats from "../Components/common/DisplayAllChats/DisplayAllChats.jsx";
import EditProfile from "../Components/common/EditProfile/index.jsx"

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
      element: <HomeLayout />,
    },
    {
        path:"/profile",
        element: <ProfileLayout />
    },
    {
        path:"/searchtutor",
        element: <SearchTutor />
    },
    {
        path:"/searchfriend",
        element: <SearchFriend />
    },
    {
        path:"/welcome",
        element: <Welcome />
    },
    {
        path:"/createprofile",
        element: <CreateProfile />
    },
    {
        path: "/chat",
        element: <Chat/>
    },
    {
        path: "/allchats",
        element: <DisplayAllChats />
    },
    {
        path: "/editprofile",
        element: <EditProfile />
    }
  ]);
