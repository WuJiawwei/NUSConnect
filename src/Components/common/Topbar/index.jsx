import React from 'react'
import {useState} from "react";
import "./index.scss"
import projectLogo from "../../../assets/projectLogo.png"
import { FaHome, FaUsers, FaBriefcase, FaSearch, FaComments} from "react-icons/fa"
import { MdMessage} from "react-icons/md"
import { BiSolidBellRing} from "react-icons/bi"
import { RiTimerFill } from 'react-icons/ri'
import user from "../../../assets/user.png"
import { useNavigate } from 'react-router-dom'
import SearchPopup from "../Popups/searchredirect.jsx";
import {UserData} from "../../../UserData.js";

export default function Topbar() {
    let navigate = useNavigate()

    const [isRedirectOpen, setIsRedirectOpen] = useState(false);

    return <div>
        <div className="topbar-main">
            <img className="project-Logo" src={projectLogo} alt="projectLogo"/>
            <div className="react-icons">
                <FaSearch
                    size={30}
                    className="react-icon"
                    onClick={() => setIsRedirectOpen(true)}
                />
                <FaHome
                    size={30}
                    className="react-icon"
                    onClick={() => navigate("/home")}
                />
                {/*<FaUsers size={30} className="react-icon"/>*/}
                <RiTimerFill
                    size={30}
                    className="react-icon"
                    onClick={() => navigate("/todo")}
                />
                {/*<MdMessage size={30} className="react-icon"/>*/}
                {/*<BiSolidBellRing
                    size={30}
                    className="react-icon"
                    onClick={() => navigate("/notification")}
                />*/}
                <FaComments
                    size={30}
                    className="react-icon"
                    onClick={() => navigate("/allchats")}
                />
            </div>
            <button className="profile-button"
                    onClick={() => navigate("/profile")}>
                {UserData === null ? <img src={user} width={40}/> : <img src={UserData.avatar} width={40}/>}
            </button>
        </div>
        {isRedirectOpen ? <SearchPopup func={() => setIsRedirectOpen(false)}/> : <div></div>}
    </div>
}
