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
import {toast} from "react-toastify";
import {getFirestore, doc, updateDoc} from "firebase/firestore"
import {useNavigate} from "react-router-dom";
import { FaFaceSmile} from "react-icons/fa6";
import {UserData, updateUserData} from "../../../UserData.js"
import "./index.scss"

const CreateProfile = () => {

    let nav = useNavigate();
    const [clickNum, setClickNum] = useState(0);

    const [account, setAccount] = useState(null);

    const [editInputs, setEditInputs] = useState({})
    const getInput = (event) => {
        let { name, value } = event.target
        let input = { [name]: value }
        setEditInputs({...editInputs, ...input})
    }

    const handleSubmit = async () => {
        editInputs["chatRooms"] = [] // this array will contain the ids of all the chat rooms
        let hasAvatarBeenSelected = false;
        for (let i = 0; i < selected.length; i++) {
            hasAvatarBeenSelected = hasAvatarBeenSelected || selected[i];
        }
        if (!hasAvatarBeenSelected) {
            toast.error("Please select an avatar");
        }

        let hasYearBeenSelected = false;
        for (let i = 0; i < selected.length; i++) {
            hasYearBeenSelected = hasYearBeenSelected|| year[i];
        }
        if (!hasAvatarBeenSelected) {
            toast.error("Please select your year of study");
        }
        if (editInputs.name.length === 0) {
            toast.error("Please enter a valid name");
        }
        if (editInputs.major.length === 0) {
            toast.error("Please enter a valid major");
        }
        if (editInputs.hobby.length === 0) {
            toast.error("Please enter a valid hobby");
        }
        if (editInputs.tagline.length === 0) {
            toast.error("Please enter a valid tagline");
        }
        if (clickNum === 0) {
            setClickNum(1);
            getCurrentUser(setAccount) // allow use for getCurrentUser here, inside a method invoked when a button is clicked
        } else {
            try {
                const id = account.userID
                const firestore = getFirestore();
                const docRef = doc(firestore, "users", id)
                await updateDoc(docRef, editInputs);
                editInputs["userID"] = account.userID
                updateUserData(editInputs)
                console.log(UserData)
                nav("/welcome")
                toast.success("Account created successfully.")
            } catch (err) {
                console.log(err);
            }
        }
    }

    const avatars = [user, user1, user2, user3, user4, user5, user6];
    const [selected, setSelected] = useState([false, false, false, false, false, false, false]);
    const [year, setYear] = useState([false, false, false, false, false]);
    const [wantsToBefriend, setWantsToBefriend] = useState(false);
    const [wantsToTutor, setWantsToTutor] = useState(false);

    const manageClickForAvatar = (pos) => {
        for (let i = 0; i < selected.length; i++) {
            if (i === pos) {
                selected[i] = true;
                editInputs["avatar"] = avatars[pos];
            } else {
                selected[i] = false;
            }
        }
    }

    const manageClickForYear = (pos) => {
        for (let i = 0; i < year.length; i++) {
            if (i === pos) {
                year[i] = true;
                editInputs["year"] = "Year " + (i + 1);
            } else {
                year[i] = false;
            }
        }
    }

    const setHobbyAfterProcessing = e => {
        const rawValue = e.target.value;
        const processedValue = rawValue.replace(/-/g, '').replace(/ /g, "").toUpperCase();
        editInputs["hobby"] = processedValue;
    }

    const setModuleCodeAfterProcessing = e => {
        const rawValue = e.target.value;
        const processedValue = rawValue.replace(/-/g, '')
            .replace(/ /g, "").toUpperCase();
        editInputs["Module Code"] = processedValue;
    }

    const setNameAfterProcessing = e => {
        const rawValue = e.target.value;
        const processedValue = rawValue.toUpperCase();
        editInputs["name"] = processedValue;
    }

    const handleClickForBefriending = () => {
        if (wantsToBefriend) {
            setWantsToBefriend(false);
            editInputs["wantsToBefriend"] = false;
        } else {
            setWantsToBefriend(true);
            editInputs["wantsToBefriend"] = true;
        }
    }

    const handleClickForTutoring = () => {
        if (wantsToTutor) {
            setWantsToTutor(false);
            editInputs["wantsToTutor"] = false;
        } else {
            setWantsToTutor(true);
            editInputs["wantsToTutor"] = true;
        }
    }

    return (
        <div className='card'>
            <div className="instruction-bar">
                <div className="instruction">
                    Let's help you get started by helping you create your profile!
                </div>
                <div className="instruction-icon"><FaFaceSmile/></div>
            </div>

            <div className='input'>
                <input
                    className="each"
                    placeholder='Name'
                    name="name"
                    onChange={setNameAfterProcessing}
                />
                <div>Pick your avatar:
                    <div>
                        <button
                            className="avatar-button"
                            onClick={() => manageClickForAvatar(0)}
                            style={{backgroundColor: selected[0] ? "pink" : "white"}}>
                            <img src={user} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                            onClick={() => manageClickForAvatar(1)}
                            style={{backgroundColor: selected[1] ? "pink" : "white"}}
                        >
                            <img src={user1} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                            onClick={() => manageClickForAvatar(2)}
                            style={{backgroundColor: selected[2] ? "pink" : "white"}}
                        >
                            <img src={user2} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                            onClick={() => manageClickForAvatar(3)}
                            style={{backgroundColor: selected[3] ? "pink" : "white"}}
                        >
                            <img src={user3} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                            onClick={() => manageClickForAvatar(4)}
                            style={{backgroundColor: selected[4] ? "pink" : "white"}}
                        >
                            <img src={user4} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                            onClick={() => manageClickForAvatar(5)}
                            style={{backgroundColor: selected[5] ? "pink" : "white"}}
                        >
                            <img src={user5} width={80}/>
                        </button>
                        <button
                            className="avatar-button"
                            onClick={() => manageClickForAvatar(6)}
                            style={{backgroundColor: selected[6] ? "pink" : "white"}}
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
                            onClick={() => manageClickForYear(0)}
                            style={{backgroundColor: year[0] ? 'lightgreen' : '#108672'}}
                        >
                            Undergraduate Year 1
                        </button>
                        <button
                            className="options-button"
                            onClick={() => manageClickForYear(1)}
                            style={{backgroundColor: year[1] ? 'lightgreen' : '#108672'}}
                        >
                            Undergraduate Year 2
                        </button>
                        <button
                            className="options-button"
                            onClick={() => manageClickForYear(2)}
                            style={{backgroundColor: year[2] ? 'lightgreen' : '#108672'}}
                        >
                            Undergraduate Year 3
                        </button>
                        <button
                            className="options-button"
                            onClick={() => manageClickForYear(3)}
                            style={{backgroundColor: year[3] ? 'lightgreen' : '#108672'}}
                        >
                            Undergraduate Year 4
                        </button>
                        <button
                            className="options-button"
                            onClick={() => manageClickForYear(4)}
                            style={{backgroundColor: year[4] ? 'lightgreen' : '#108672'}}
                        >
                            Undergraduate Year 5
                        </button>
                    </div>
                </div>

                <input
                    className="each"
                    placeholder='Major'
                    onChange= {getInput}
                    name="major"
                />

                <input
                    className="each"
                    placeholder='Hobby'
                    name="hobby"
                    onChange={setHobbyAfterProcessing}
                />

                <input
                    className="each"
                    placeholder='Tagline'
                    name="tagline"
                    onChange={getInput}
                />

                <div>Tell us why you're using NUSConnect:
                    <div className="fine-print">You can always turn these options off if you think you need a
                        break.</div>
                    <div>
                        <button
                            className="options-button"
                            onClick={handleClickForBefriending}
                            style={{backgroundColor: wantsToBefriend ? 'lightgreen' : '#108672'}}
                        >
                            <div className="indicator-checkbox">{wantsToBefriend ? <FaCheckCircle/> : <FaCircle/>}</div>
                            To make new connections
                        </button>
                    </div>
                    <div>
                        <button
                            className="options-button"
                            onClick={handleClickForTutoring}
                            style={{backgroundColor: wantsToTutor ? 'lightgreen' : '#108672'}}
                        >
                            <div className="indicator-checkbox">{wantsToTutor ? <FaCheckCircle/> : <FaCircle/>}</div>
                            To be a volunteer tutor
                        </button>
                    </div>
                </div>

                <div>If you want to become a volunteer tutor, tell us which module you would like to tutor:</div>
                <input
                    className="each"
                    placeholder='(Optional)Module Code'
                    onChange={setModuleCodeAfterProcessing}
                />
            </div>
            {clickNum === 0 ?
                <button
                    className='save'
                    onClick={handleSubmit}
                >
                    Submit
                </button> :
                <button
                className='save-again'
                onClick={handleSubmit}>
                    Connect Now
                </button>
            }
        </div>
    )
}

export default CreateProfile