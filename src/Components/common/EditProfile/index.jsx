import React, { useState } from 'react';
import "./index.scss";
import user from "../../../assets/user.png";
import user1 from "../../../assets/user1.svg";
import user2 from "../../../assets/user2.svg";
import user3 from "../../../assets/user3.svg";
import user4 from "../../../assets/user4.svg";
import user5 from "../../../assets/user5.svg";
import user6 from "../../../assets/user6.svg";
import { FaFaceSmile, FaCircleChevronLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimesCircle, FaPencilAlt, FaCircle } from "react-icons/fa";
import { UserData , updateFieldInUserData} from "../../../UserData.js";
import {toast} from "react-toastify"
import {collection, doc, getFirestore, updateDoc} from "firebase/firestore"

export default function EditProfile({ currentUser, onEdit }) {
    let nav = useNavigate();
    const [editPreference, setEditPreference] = useState({
        wantsToEditName: false,
        wantsToEditAvatar: false,
        wantsToEditTagline: false,
        wantsToEditMajor: false,
        wantsToEditHobby: false,
        wantsToEditModuleCode: false,
        wantsToEditYear: false,
        wantsToEditPref: false
    });

    const [name, setName] = useState("");
    const [tagline, setTagline] = useState("");
    const [major, setMajor] = useState("");
    const [hobby, setHobby] = useState("");
    const [module, setModule] = useState("");
    const [wantsToBefriend, setWantsToBefriend] = useState(false);
    const [wantsToTutor, setWantsToTutor] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState([false, false, false, false, false, false, false]);
    const [year, setYear] = useState([false, false, false, false, false]);

    const handlePref = (val) => {
        setEditPreference(prevState => ({ ...prevState, [val]: !editPreference[val] }));
    };

    const manageClickForAvatar = (pos) => {
        setSelectedAvatar(selectedAvatar.map((_, index) => index === pos));
    };

    const manageClickForYear = (pos) => {
        setYear(year.map((_, index) => index === pos));
    };

    const handleClickForBefriending = () => {
        setWantsToBefriend(!wantsToBefriend);
    };

    const handleClickForTutoring = () => {
        setWantsToTutor(!wantsToTutor);
    };

    const saveChanges = async () => {
        const editInputs = {};
        if (editPreference["wantsToEditName"]) {
            if (name.length === 0) {
                toast.error("Please enter a valid name.");
            }
            editInputs['name'] = name;
            updateFieldInUserData({name : editInputs['name']});
        }
        if (editPreference["wantsToEditAvatar"]) {
            const avatars = [user, user1, user2, user3, user4, user5, user6]
            let b = false;
            for (let i = 0; i < selectedAvatar.length; i++) {
                b = b || selectedAvatar[i];
                if (selectedAvatar[i]) {
                    editInputs['avatar'] = avatars[i]
                }
            }
            if (!b) {
                toast.error("Please pick an avatar.");
            } else {
                updateFieldInUserData({avatar : editInputs['avatar']});
            }
        }
        if (editPreference["wantsToEditYear"]) {
            let b = false;
            for (let i = 0; i < year.length; i++) {
                b = b || year[i]
                if (year[i]) {
                    const x = i + 1;
                    editInputs['year'] = "Year " + x;
                }
            }
            if (!b) {
                toast.error("Please pick a year.");
            } else {
                updateFieldInUserData({year : editInputs['year']});
            }
        }
        if (editPreference["wantsToEditTagline"]) {
            if (tagline.length === 0) {
                toast.error("Please enter a valid tagline.");
            }
            editInputs['tagline'] = tagline;
            updateFieldInUserData({tagline : editInputs['tagline']});
        }
        if (editPreference["wantsToEditMajor"]) {
            if (major.length === 0) {
                toast.error("Please enter a valid major.");
            }
            editInputs['major'] = major;
            updateFieldInUserData({major : editInputs['major']})
        }
        if (editPreference["wantsToEditHobby"]) {
            if (hobby.length === 0) {
                toast.error("Please enter a valid hobby");
            }
            editInputs['hobby'] = hobby;
            updateFieldInUserData({hobby : editInputs['hobby']})
        }
        if (editPreference["wantsToEditPref"]) {
            editInputs['wantsToBefriend'] = wantsToBefriend;
            editInputs['wantsToTutor'] = wantsToTutor;
            updateFieldInUserData({wantsToBefriend: wantsToBefriend});
            updateFieldInUserData({wantsToTutor: wantsToTutor});
        }
        if (editPreference["wantsToEditModuleCode"]) {
            editInputs["Module Code"] = module;
            const arr = [];
            arr["Module Code"] = module
            updateFieldInUserData(arr)
        }
        try {
            const db = getFirestore()
            const dbRef = collection(db, 'users')
            const docRef = doc(dbRef, UserData.userID)
            await updateDoc(docRef, editInputs);
            nav('/profile')
            console.log(UserData)
        } catch (err) {
            console.log(err);
        }
    };

    if (currentUser !== null) {
        return (
            <div>
                <div className="instruction-bar-change-prof">
                    <div className="instruction">
                        Update your profile
                    </div>
                    <div className="instruction-icon">
                        <FaFaceSmile />
                    </div>
                </div>

                <button
                    className="nav-back-button"
                    onClick={() => nav("/profile")}
                >
                    <FaCircleChevronLeft />
                </button>
                <div>
                    <div>Your name is:</div>
                    {editPreference['wantsToEditName'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditName')}>
                            <div className="edit-content"><FaCheckCircle /></div>
                            <div className="edit-content">Edit Current Name</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditName')}>
                            <div className='edit-content'><FaTimesCircle /></div>
                            <div className='edit-content'>Do Not Edit Name</div>
                        </button>}
                    <input
                        className="input-bar"
                        placeholder={UserData.name}
                        onChange={e => setName(e.target.value.toUpperCase())}
                    />

                    <div>
                        <div>Your current avatar is:</div>
                        <img src={UserData.avatar} width={80} height={80} />
                    </div>
                    <div>Pick your avatar:
                        {editPreference['wantsToEditAvatar'] ?
                            <button className='edit-button' onClick={() => handlePref('wantsToEditAvatar')}>
                                <div className="edit-content"><FaCheckCircle /></div>
                                <div className="edit-content">Edit Avatar</div>
                            </button> :
                            <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditAvatar')}>
                                <div className='edit-content'><FaTimesCircle /></div>
                                <div className='edit-content'>Do Not Edit Avatar</div>
                            </button>}
                        <div>
                            {selectedAvatar.map((selected, index) => (
                                <button
                                    key={index}
                                    onClick={() => manageClickForAvatar(index)}
                                    style={{ backgroundColor: selected ? 'pink' : 'white' }}
                                    className='avatar-button'
                                >
                                    <img src={[user, user1, user2, user3, user4, user5, user6][index]} width={80} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>Your current year of study is: {UserData.year}</div>
                    {editPreference['wantsToEditYear'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditYear')}>
                            <div className="edit-content"><FaCheckCircle /></div>
                            <div className="edit-content">Edit Year</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditYear')}>
                            <div className='edit-content'><FaTimesCircle /></div>
                            <div className='edit-content'>Do Not Edit Year</div>
                        </button>}
                    <div>Year of study:</div>
                    <div className="input">
                        <div className="buttons-div">
                            {year.map((selected, index) => (
                                <button
                                    key={index}
                                    className="options-button"
                                    onClick={() => manageClickForYear(index)}
                                    style={{ backgroundColor: selected ? 'lightgreen' : '#108672' }}
                                >
                                    Undergraduate Year {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>Your tagline is:</div>
                    {editPreference['wantsToEditTagline'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditTagline')}>
                            <div className="edit-content"><FaCheckCircle /></div>
                            <div className="edit-content">Edit Tagline</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditTagline')}>
                            <div className='edit-content'><FaTimesCircle /></div>
                            <div className='edit-content'>Do Not Edit Tagline</div>
                        </button>}
                    <input
                        className="input-bar"
                        placeholder={UserData.tagline}
                        onChange={e => setTagline(e.target.value)}
                    />

                    <div>Your major is:</div>
                    {editPreference['wantsToEditMajor'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditMajor')}>
                            <div className="edit-content"><FaCheckCircle /></div>
                            <div className="edit-content">Edit Major</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditMajor')}>
                            <div className='edit-content'><FaTimesCircle /></div>
                            <div className='edit-content'>Do Not Edit Major</div>
                        </button>}
                    <input
                        className="input-bar"
                        placeholder={UserData.major}
                        onChange={e => setMajor(e.target.value)}
                    />

                    <div>Your hobby is:</div>
                    {editPreference['wantsToEditHobby'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditHobby')}>
                            <div className="edit-content"><FaCheckCircle /></div>
                            <div className="edit-content">Edit Hobby</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditHobby')}>
                            <div className='edit-content'><FaTimesCircle /></div>
                            <div className='edit-content'>Do Not Edit Hobby</div>
                        </button>}
                    <input
                        className="input-bar"
                        placeholder={UserData.hobby}
                        onChange={e => setHobby(e.target.value.replace(/-/g, '').replace(/ /g, "").toUpperCase())}
                    />

                    <div>Your current preferences are: </div>
                    <div>Do you want to befriend others? {UserData.wantsToBefriend ? "Yes" : "No"}</div>
                    <div>Do you want to tutor others? {UserData.wantsToTutor ? "Yes" : "No"}</div>
                    <div>Your preferences:</div>
                    {editPreference['wantsToEditPref'] ?
                        <button className='edit-button' onClick={() => handlePref('wantsToEditPref')}>
                            <div className="edit-content"><FaCheckCircle /></div>
                            <div className="edit-content">Edit Preferences</div>
                        </button> :
                        <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditPref')}>
                            <div className='edit-content'><FaTimesCircle /></div>
                            <div className='edit-content'>Do Not Edit Preferences</div>
                        </button>}
                    <div className="buttons-div">
                        <div>
                            <button
                                className="options-button"
                                onClick={handleClickForBefriending}
                                style={{backgroundColor: wantsToBefriend ? 'lightgreen' : '#108672'}}
                            >
                                <div className="indicator-checkbox">{wantsToBefriend ? <FaCheckCircle/> :
                                    <FaCircle/>}</div>
                                To make new connections
                            </button>
                        </div>
                        <div>
                            <button
                                className="options-button"
                                onClick={handleClickForTutoring}
                                style={{backgroundColor: wantsToTutor ? 'lightgreen' : '#108672'}}
                            >
                                <div className="indicator-checkbox">{wantsToTutor ? <FaCheckCircle/> :
                                    <FaCircle/>}</div>
                                To be a volunteer tutor
                            </button>
                        </div>
                        <div>The module you would like to tutor is:</div>
                        {editPreference['wantsToEditModuleCode'] ?
                            <button className='edit-button' onClick={() => handlePref('wantsToEditModuleCode')}>
                                <div className="edit-content"><FaCheckCircle/></div>
                                <div className="edit-content">Edit Module Code</div>
                            </button> :
                            <button className='do-not-edit-button' onClick={() => handlePref('wantsToEditModuleCode')}>
                                <div className='edit-content'><FaTimesCircle/></div>
                                <div className='edit-content'>Do Not Edit Module Code</div>
                            </button>}
                        <input
                            className="input-bar"
                            placeholder={UserData["Module Code"]}
                            onChange={e => setModule(e.target.value.replace(/-/g, '').replace(/ /g, "").toUpperCase())}
                        />
                    </div>
                </div>
                <button className="save" onClick={saveChanges}>Update profile</button>
            </div>
        );
    }
}
