import React, { useState } from 'react'
import "./index.scss"
import user from "../../../assets/user.png"
import user1 from "../../../assets/user1.svg"
import user2 from "../../../assets/user2.svg"
import user3 from "../../../assets/user3.svg"
import user4 from "../../../assets/user4.svg"
import user5 from "../../../assets/user5.svg"
import user6 from "../../../assets/user6.svg"
import {FaFaceSmile, FaCircleChevronLeft} from "react-icons/fa6";
import {useNavigate} from "react-router-dom";
import {FaCheckCircle, FaTimesCircle, FaPencilAlt} from "react-icons/fa";
import {UserData} from "../../../UserData.js"
import {editProfile} from "../../../api/FirestoreAPI.jsx";

export default function EditProfile({ currentUser, onEdit }) {

    let nav = useNavigate();
    const [editPreference, setEditPreference] = useState({wantsToEditName : false, wantsToEditAvatar : false,
        wantsToEditTagline : false, wantsToEditMajor : false, wantsToEditHobby : false, wantsToEditModuleCode : false,
    wantsToEditYear : false, wantsToEditPref : false});

    const handlePref = (val) => {
        setEditPreference(prevState => ({ ...prevState, [val]: !editPreference[val] }))
    }

    if (currentUser !== null) {
        return (<div>
            <div className="instruction-bar-change-prof">
                <div className="instruction">
                    Update your profile
                </div>
                <div className="instruction-icon">
                    <FaFaceSmile/>
                </div>
            </div>

            <button
                className="nav-back-button"
                onClick={() => nav("/profile")}
            >
                <FaCircleChevronLeft/>
            </button>
            <div>
                <div>Your name is:</div>
                {editPreference['wantsToEditName'] ?
                    <button className='edit-button' onClick={() => handlePref('wantsToEditName')}>
                        <div className="edit-content"><FaCheckCircle/></div>
                        <div className="edit-content">Edit Name</div>
                    </button> :
                    <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditName')}>
                        <div className='edit-content'><FaTimesCircle/></div>
                        <div className='edit-content'>Do Not Edit Name</div>
                    </button>}
                <input className="input-bar" placeholder={UserData.name}/>

                <div>
                    <div>Your current avatar is:</div>
                    <img src={UserData.avatar} width={80} height={80}/>
                </div>
                <div>Pick your avatar:
                    {editPreference['wantsToEditAvatar'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditAvatar')}>
                            <div className="edit-content"><FaCheckCircle/></div>
                            <div className="edit-content">Edit Avatar</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditAvatar')}>
                            <div className='edit-content'><FaTimesCircle/></div>
                            <div className='edit-content'>Do Not Edit Avatar</div>
                        </button>}
                    <div>
                        <button
                            className="avatar-button">
                            <img src={user} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                        >
                            <img src={user1} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                        >
                            <img src={user2} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                        >
                            <img src={user3} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                        >
                            <img src={user4} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                        >
                            <img src={user5} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                        >
                            <img src={user6} width={80}/>
                        </button>
                    </div>
                </div>

                <div>Your current year of study is: {UserData.year}</div>
                {editPreference['wantsToEditYear'] ?
                    <button className='edit-button' onClick={() => handlePref('wantsToEditYear')}>
                        <div className="edit-content"><FaCheckCircle/></div>
                        <div className="edit-content">Edit Year</div>
                    </button> :
                    <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditYear')}>
                        <div className='edit-content'><FaTimesCircle/></div>
                        <div className='edit-content'>Do Not Edit Year</div>
                    </button>}
                <div>Year of study:</div>
                <div className="input">
                    <div className="buttons-div">
                        <button
                            className="options-button"
                        >
                            Undergraduate Year 1
                        </button>
                        <button
                            className="options-button"
                        >
                            Undergraduate Year 2
                        </button>
                        <button
                            className="options-button"
                        >
                            Undergraduate Year 3
                        </button>
                        <button
                            className="options-button"
                        >
                            Undergraduate Year 4
                        </button>
                        <button
                            className="options-button"
                        >
                            Undergraduate Year 5
                        </button>
                    </div>
                </div>

                <div>Your tagline is:</div>
                {editPreference['wantsToEditTagline'] ?
                    <button className='edit-button' onClick={() => handlePref('wantsToEditTagline')}>
                        <div className="edit-content"><FaCheckCircle/></div>
                        <div className="edit-content">Edit Tagline</div>
                    </button> :
                    <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditTagline')}>
                        <div className='edit-content'><FaTimesCircle/></div>
                        <div className='edit-content'>Do Not Edit Tagline</div>
                    </button>
                }
                <input className="input-bar" placeholder={UserData.tagline}/>

                <div>Your major is:</div>
                {editPreference['wantsToEditMajor'] ?
                    <button className='edit-button' onClick={() => handlePref('wantsToEditMajor')}>
                        <div className="edit-content"><FaCheckCircle/></div>
                        <div className="edit-content">Edit Major</div>
                    </button> :
                    <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditMajor')}>
                        <div className='edit-content'><FaTimesCircle/></div>
                        <div className='edit-content'>Do Not Edit Major</div>
                    </button>
                }
                <input className="input-bar" placeholder={UserData.major}/>

                <div>Your hobby is:</div>
                {editPreference['wantsToEditHobby'] ?
                    <button className='edit-button' onClick={() => handlePref('wantsToEditHobby')}>
                        <div className="edit-content"><FaCheckCircle/></div>
                        <div className="edit-content">Edit Hobby</div>
                    </button> :
                    <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditHobby')}>
                        <div className='edit-content'><FaTimesCircle/></div>
                        <div className='edit-content'>Do Not Edit Hobby</div>
                    </button>
                }
                <input className="input-bar" placeholder={UserData.hobby}/>

                <div>You're using NUSConnect for:
                    {UserData.wantsToTutor && UserData.wantsToBefriend ?
                        <div>Befriending and tutoring.</div> : UserData.wantsToBefriend ?
                            <div>Befriending</div> : UserData.wantsToTutor ?
                                <div>Tutoring</div> : <div>No purpose</div>
                    }
                    {editPreference['wantsToEditPref'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditPref')}>
                            <div className="edit-content"><FaCheckCircle/></div>
                            <div className="edit-content">Edit Preferences</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditPref')}>
                            <div className='edit-content'><FaTimesCircle/></div>
                            <div className='edit-content'>Do Not Edit Preferences</div>
                        </button>}
                    <div>
                        <button
                            className="options-button"
                        >
                            To make new connections
                        </button>
                    </div>
                    <div>
                        <button
                            className="options-button"
                        >
                            <div className="indicator-checkbox"></div>
                            To be a volunteer tutor
                        </button>
                    </div>
                </div>

                <div>The module you are currently tutoring is:</div>
                {editPreference['wantsToEditModuleCode'] ?
                    <button className='edit-button' onClick={() => handlePref('wantsToEditModuleCode')}>
                        <div className="edit-content"><FaCheckCircle/></div>
                        <div className="edit-content">Edit Module Code</div>
                    </button> :
                    <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditModuleCode')}>
                        <div className='edit-content'><FaTimesCircle/></div>
                        <div className='edit-content'>Do Not Edit Module Code</div>
                    </button>
                }
                <input className="input-bar" placeholder={UserData["Module Code"]}/>
                <button
                    className='save'
                >
                    Save
                </button>
            </div>
        </div>)
    }
}