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

export default function EditProfile({ currentUser, onEdit }) {

    const handleEditProfile = async () => {
        /* todo: implement editProfile using firebase apis => if confused,
        go to createProfile / google */
    }

    let nav = useNavigate();

    if (currentUser !== null) {
        return (<div>
            <div className="instruction-bar-change-prof">
                <div className="instruction">
                    Update your profile whichever way you prefer!
                </div>
                <div className="instruction-icon"><FaFaceSmile/></div>
            </div>

            <button
                onClick = {() => nav("/profile")}
            >
                <FaCircleChevronLeft/>
            </button>

            <div className='input'>
                <input
                    className="each"
                    placeholder='Name'
                    name="name"
                />
                <div>Pick your avatar:
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
                <div>
                    <div>What is your year of study?</div>
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

                <input
                    className="each"
                    placeholder='Major'
                    name="major"
                />

                <input
                    className="each"
                    placeholder='Hobby'
                    name="hobby"
                />

                <input
                    className="each"
                    placeholder='Tagline'
                    name="tagline"
                />

                <div>Tell us why you're using NUSConnect:
                    <div className="fine-print">You can always turn these options off if you think you need a
                        break.</div>
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

                <div>If you want to become a volunteer tutor, tell us which module you would like to tutor:</div>
                <input
                    className="each"
                    placeholder='(Optional)Module Code'
                />
            </div>

            <button
                className='save'
                onClick={handleEditProfile}
            >
                Save
            </button>
        </div>)
    }
}