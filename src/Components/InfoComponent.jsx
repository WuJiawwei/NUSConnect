import logo from "../assets/logo.svg"
import browserLG from "../assets/browserLG.svg"
import '../Sass/InfoComponent.scss'
import React, { useState } from 'react';
import InputProcessor from "../Helpers/InputProcesser.jsx"
import createComponentWhenClicked from "../Helpers/createComponentWhenClicked.jsx";
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

    return (<div>
        <img src={logo} alt="logo" width={300}/>
        <div>Let us get to know you better!</div>

        <div>What's your name?</div>
        <input onChange={e => setName(e.target.value)} />

        <div>Year of study?</div>
        <input onChange={e => setYear(Number(e.target.value))}/>

        <div>Your major?</div>
        <InputProcessor onChange={e => setMajor(e.target.value)} />

        <div>Tell us what your hobby is:</div>
        <InputProcessor onChange = {(e) => setHobby(e.target.value)} />
        <div>*Omit hyphens and spacing for your answer</div>
        <div>*Please note that this information will be made public.</div>

        <div>Your tagline</div>
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
            </ul>
            <div>If you picked: "I am joining NUSConnect as a volunteer tutor",
            tell us the module code of the module you would like to tutor:</div>
            <InputProcessor onChange={e => setModuleCode(e.target.value)} />
        </div>


        <div>
            <button className="button" onClick={() => navigate("/home")}>
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
