import logo from "../assets/logo.svg"
import browserLG from "../assets/browserLG.svg"
import '../Sass/InfoComponent.scss'
import React, { useState } from 'react';
import InputProcessor from "../Helpers/InputProcesser.jsx"
import {collection, addDoc} from "firebase/firestore";
import {firestore} from "../firebaseConfig.js";
import { useNavigate } from "react-router-dom"

const InfoComponent = () => {

    let navigate = useNavigate()
    const [name, setName] = useState("")
    const [year, setYear] = useState(0)
    const [major, setMajor] = useState("")
    const [hobby, setHobby] = useState("")
    const [tagline, setTagline] = useState("")
    const [wantsToBefriend, setWantsToBefriend] = useState(false);
    const [wantsToTutor, setWantsToTutor] = useState(false);
    const [moduleCode, setModuleCode] = useState("");

    const handleCreateProfile = async () => {
        try {
            await addDoc(collection(firestore, "users"), {
                name : name,
                year : year,
                major : major,
                hobby : hobby,
                tagline : tagline,
                wantsToBefriend : wantsToBefriend,
                wantsToTutor : wantsToTutor,
                moduleCode : moduleCode
            })
            navigate("/home")
        } catch (err) {
            console.error("Error adding document: ", err);
        }
    }

    const handleHobbyChange = (e) => {
        const input = e.target.value;
        const processedVal = input.replace(/[\s-]/g, '').toUpperCase();
        setHobby(processedVal);
    }

    const handleMajorChange = (e) => {
        const input = e.target.value;
        const processedVal = input.replace(/[\s-]/g, '').toUpperCase();
        setMajor(processedVal);
    }

    const handleModuleCodeChange = (e) => {
        const inputValue = e.target.value;
        // Remove spaces and hyphens, then convert to uppercase
        const processedValue = inputValue.replace(/[\s-]/g, '').toUpperCase();
        setModuleCode(processedValue);
    };

    return (<div>
        <img src={logo} alt="logo" width={300}/>
        <div>Let us get to know you better!</div>

        <div>What's your name?</div>
        <input onChange={e => setName(e.target.value)} />

        <div>Year of study?</div>
        <input onChange={e => setYear(Number(e.target.value))}/>

        <div>Your major?</div>
        <input
            value={major}
            onChange={handleMajorChange}
            style={{ textTransform: 'uppercase' }}/>

        <div>Tell us what your hobby is:</div>
        <input
            value={hobby}
            onChange={handleHobbyChange}
            style={{ textTransform: 'uppercase' }}/>
        <div>*Omit hyphens and spacing for your answer</div>
        <div>*Please note that this information will be made public.</div>

        <div>Your tagline:</div>
        <input onChange={e => setTagline(e.target.value)} />

        <div>Tell us why you're joining NUSConnect:
            <ul>
                <li className="li"
                    onClick={(e) => setWantsToBefriend(!wantsToBefriend)}
                    style = {
                        {backgroundColor: wantsToBefriend ? 'pink' : 'purple'}
                    }
                >I am joining NUSConnect to make new friends</li>
                <li className="li"
                    onClick={(e) =>
                        setWantsToTutor(!wantsToTutor)
                    }
                    style = {
                        {backgroundColor: wantsToTutor ? 'pink' : 'purple'}
                    }
                >I am joining NUSConnect as a volunteer tutor</li>
                <div>*Turns pink when selected.</div>
            </ul>
            <div>If you picked: "I am joining NUSConnect as a volunteer tutor",
                tell us the module code of the module you would like to tutor:</div>
            <input
                value={moduleCode}
                onChange={handleModuleCodeChange}
                style={{ textTransform: 'uppercase' }}/>
        </div>


        <div>
            <button className="button" onClick={() => handleCreateProfile()}>Create Profile
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

export default InfoComponent;
