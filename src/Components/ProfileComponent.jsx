import logo from "../assets/logo.svg"
import browserLG from "../assets/browserLG.svg"
import '../Sass/ProfileComponent.scss'
import React, { useState } from 'react';
import InputProcessor from "../Helpers/InputProcesser.jsx"
import createComponentWhenClicked from "../Helpers/createComponentWhenClicked.jsx";
import { useNavigate } from "react-router-dom"

const ProfileComponent = () => {

    let navigate = useNavigate()
    const input1 = InputProcessor("")
    const str1 = "Tell us your interests:"
    const comp1 = <div>
        <div>*This information will be displayed.</div>
        <div>*Omit hyphen for hyphenated words.</div>
    </div>
    const str2= "Module code of module you want to tutor:"
    const comp2 = <div>
        <div>E.g. PH1251</div>
    </div>

    return (<div>
        <img src={logo} alt="logo" width={300}/>
        <div >Let us get to know you better!</div>
        <div>Email (used at sign in):</div>
        <input/>
        <div>Name(as in student ID):</div>
        <input/>
        <div>I am joining NUSConnect to make new friends:</div>
        <ul className="ul">
            <li className="li">No</li>
            {createComponentWhenClicked(input1, str1, comp1)}
        </ul>
        <div>I am joining NUSConnect to find a tutor:</div>
        <ul className="ul">
            <li className="li">No</li>
            <li className="li">Yes</li>
        </ul>
        <div>I am joining NUSConnect to as a volunteer</div>
        <div>tutor:</div>
        <div>
            <ul className="ul">
                <li className="li">No</li>
                {createComponentWhenClicked(input1, str2, comp2)}
            </ul>
        </div>
        <div>
            <button className="button" onClick={() => navigate("/welcome")}>
                Create Profile
                <div>
                    <img src={browserLG}
                         alt="Connect Now"
                         width={50}/>
                </div>
            </button>
        </div>
    </div>)
}

export default ProfileComponent;
