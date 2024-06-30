import React, {useState} from "react";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import user from "../../../assets/user.png";
import user1 from "../../../assets/user1.svg";
import user2 from "../../../assets/user2.svg";
import user3 from "../../../assets/user3.svg";
import user4 from "../../../assets/user4.svg";
import user5 from "../../../assets/user5.svg";
import user6 from "../../../assets/user6.svg";
import {FaCheckCircle, FaCircle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const CreateProfile = () => {

    const nav = useNavigate();

    const [account, setAccount] = useState(null);
    getCurrentUser(setAccount)

    const handleSubmit = () => {
        console.log(account);
        nav("/home")
    }

    return (
        <div className='card'>
            <div>Pick your avatar:
                <div>
                    <button
                        className="avatar-button">
                        <img src={user} width={80}/>
                    </button>
                    <button
                        className="avatar-button">
                        <img src={user1} width={80}/>
                    </button>
                    <button
                        className="avatar-button">
                        <img src={user2} width={80}/>
                    </button>
                    <button
                        className="avatar-button">
                        <img src={user3} width={80}/>
                    </button>
                    <button
                        className="avatar-button">
                        <img src={user4} width={80}/>
                    </button>
                    <button
                        className="avatar-button">
                        <img src={user5} width={80}/>
                    </button>
                    <button
                        className="avatar-button">
                        <img src={user6} width={80}/>
                    </button>
                </div>
            </div>

            <div className='input'>
                <input
                    className="each"
                    placeholder='Name'
                    name="name"
                />

                <input
                    className="each"
                    placeholder='Year of Study'
                    name='year'
                />

                <input
                    className="each"
                    placeholder='Major'
                    name="major"
                />

                <input
                    className="each"
                    placeholder='Hobby (Write in all caps and in one word...)'
                    name="hobby"
                />
                <div className="fine-print">
                    Writing in all caps will facilitate searching for interests.
                </div>

                <input
                    className="each"
                    placeholder='Tagline'
                    name="tagline"
                />


                <div>Tell us why you're using NUSConnect:
                    <div className="fine-print">You can always turn these options off if you think you need a break.</div>
                    <div>
                        <button
                            className="options-button"
                        >
                            <div className="indicator-checkbox"></div>
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
                    placeholder='Module Code(Write in all caps, omit spacing)'
                    name="Module Code"
                />
                <div className="fine-print">Writing in all capital-letters and no spacing facilitates search for tutors.
                </div>
            </div>

            <button
                className='save'
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    )
}

export default CreateProfile