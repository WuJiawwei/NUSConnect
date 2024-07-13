import React, { useEffect, useState } from 'react';
import { getFirestore, getDoc, doc, updateDoc } from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import {useNavigate} from "react-router-dom";

const FriendProfileModal = ({ userId, onClose }) => {
    const [acc, setAcc] = useState(null);
    const [curr, setCurr] = useState(null);
    const [loading, setLoading] = useState(true);

    getCurrentUser(setCurr);

    let nav = useNavigate()

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

    if (loading) {
        return <div>Loading...</div>;
    }

    const { avatar, name, hobby, tagline, year } = acc;

    const startChat = async () => {
        //todo
        // also do not forget to update UserData
    }

    const alreadyContains = (currContacts, lookFor) => {
        for (let i = 0; i < currContacts.length; i++) {
            if (currContacts[i] === lookFor) {
                return true;
            }
        }
        return false;
    }

    return (
        <div>
            <div className="overlay">
                <div className="popup">
                    <button className="close-button" onClick={onClose}>X</button>
                    <div>
                        <div className="credentials">
                            <button className="avatar-button"><img src={avatar} width={80}/></button>
                            <button className="name-button">{name}</button>
                        </div>
                        <div>
                            <button className="hobby-field-button">Hobby</button>
                            <button className="friend-input-button">{hobby}</button>
                        </div>
                        <div>
                            <button className="tagline-field-button">Tagline</button>
                            <button className="friend-input-button">{tagline}</button>
                        </div>
                        <div>
                            <button className="year-field-button">Year</button>
                            <button className="friend-input-button">{year}</button>
                        </div>
                        <button
                            className="chat-button"
                            onClick={startChat}>
                            <div className="chat-button-design">
                                <div>Chat</div>
                                <FaComment/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendProfileModal;