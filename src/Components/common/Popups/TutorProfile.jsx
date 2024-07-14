import React, { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, updateDoc, arrayUnion, collection} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {UserData} from "../../../UserData.js";
import {useNavigate} from "react-router-dom";

const TutorProfileModal = ({ userId, onClose }) => {
    const [acc, setAcc] = useState(null);
    const [loading, setLoading] = useState(true);

    const nav = useNavigate()

    useEffect(() => {
        const db = getFirestore();
        const docRef = doc(db, 'users', userId);

        const fetchData = async () => {
            try {
                const sp = await getDoc(docRef);
                if (sp.exists()) {
                    setAcc(sp.data());
                }
            } catch (err) {
                console.error('Error fetching document:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    const db = getFirestore();
    const dbRef = collection(db, 'users');

    const startChat = async () => {
        /*const currUserContacts = UserData.contacts
        if (currUserAlreadyHasContact(currUserContacts, userId)) {
            UserData.currentlyTexting = userId
            nav("/chat")
        } else {
            try {
                const docRef = await doc(dbRef, UserData.userID);
                await updateDoc(docRef, {contacts: arrayUnion(userId)})
                UserData.currentlyTexting = userId
                UserData.contacts.push(userId)
                nav("/chat")
            } catch (err) {
                console.log("The user you are trying to contact is unavailable.")
            }
        }*/
    }

    const currUserAlreadyHasContact = (currUserContacts, userId) => {
        for (let i = 0; i < currUserContacts.length; i++) {
            if (currUserContacts[i] === userId) {
                return true;
            }
        }
        return false;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const { avatar, name, "Module Code": moduleCode, tagline, year } = acc;

    if (UserData !== null) {
        if (acc !== null) {
            return (
                <div className="overlay">
                    <div className="popup">
                        <button className="close-button" onClick={onClose}>X</button>
                        <div>
                            <div  className="credentials">
                                <button className="avatar-button"><img src={avatar} width={80}/></button>
                                <button className="name-button">{name}</button>
                            </div>
                            <div>
                                <button className="module-field-button">Module</button>
                                <button className="tutor-input-button">{moduleCode}</button>
                            </div>
                            <div>
                                <button className="tagline-field-button">Tagline</button>
                                <button className="tutor-input-button">{tagline}</button>
                            </div>
                            <div>
                                <button className="year-field-button">Year</button>
                                <button className="tutor-input-button">{year}</button>
                            </div>
                            <button
                                className="chat-button"
                                onClick={startChat}
                            >
                                <div className="chat-button-design">
                                    <div>Chat</div>
                                    <FaComment/>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="overlay">
                    <div className="popup">
                        <button className="close-button" onClick={onClose}>X</button>
                        <div>
                            This user is no longer using NUSConnect.
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        return <div>You do not have an account.</div>
    }
};

export default TutorProfileModal;

