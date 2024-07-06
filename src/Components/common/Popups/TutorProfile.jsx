import React, { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, updateDoc} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import {useNavigate} from "react-router-dom";

const TutorProfileModal = ({ userId, onClose }) => {
    const [acc, setAcc] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currUser, setCurrUser] = useState(null);
    getCurrentUser(setCurrUser)

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

    const startChat = async () => {
        if (currUser !== null) {
            const db = getFirestore();
            const currContacts = currUser.contacts
            const docRef = doc(db, "users", currUser.userID);
            if (!alreadyContains(currContacts, userId)) {
                currContacts.push(userId);
                try {
                    await updateDoc(docRef, {contacts : currContacts});
                    await updateDoc(docRef, {currentlyTexting : userId});
                    nav("/chat")
                } catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    await updateDoc(docRef, {currentlyTexting : userId})
                    nav("/chat")
                } catch (err) {
                    console.log(err)
                }
            }
        } else {
            console.log("You don't have an account")
        }
    }

    const alreadyContains = (currContacts, lookFor) => {
        for (let i = 0; i < currContacts.length; i++) {
            if (currContacts[i] === lookFor) {
                return true;
            }
        }
        return false;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    const { avatar, name, "Module Code": moduleCode, tagline, year } = acc;

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
};

export default TutorProfileModal;

