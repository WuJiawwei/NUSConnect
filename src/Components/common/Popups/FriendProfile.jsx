import { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, updateDoc, collection, arrayUnion} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../UserData.js"

const FriendProfileModal = ({ userId, onClose }) => {
    const [acc, setAcc] = useState(null); // is ToUser
    const [loading, setLoading] = useState(true);

    let nav = useNavigate()

    const db = getFirestore();
    const docRef = doc(db, 'users', userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Run query")
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
    }, []); // dependency is empty because the toUserId is not expected to change

    if (loading) {
        return <div>Loading...</div>;
    }

    const dbRef = collection(db, 'users');

    const startChat = async () => {
        const currUserContacts = UserData.contacts
        if (currUserAlreadyHasContact(currUserContacts, userId)) {
            UserData.currentlyTexting = acc
            nav("/chat")
            console.log(UserData);
        } else {
            try {
                const docRef = await doc(dbRef, UserData.userID);
                await updateDoc(docRef, {contacts: arrayUnion(userId)})
                UserData.currentlyTexting = acc
                UserData.contacts.push(userId)
                nav("/chat")
                console.log(UserData);
            } catch (err) {
                console.log("The user you are trying to contact is unavailable.")
            }
        }
    }

    const currUserAlreadyHasContact = (currUserContacts, userId) => {
        for (let i = 0; i < currUserContacts.length; i++) {
            if (currUserContacts[i] === userId) {
                return true;
            }
        }
        return false;
    }

    if (UserData !== null) {
        if (acc !== null) {
            return (
                <div>
                    <div className="overlay">
                        <div className="popup">
                            <button className="close-button" onClick={onClose}>X</button>
                            <div>
                                <div className="credentials">
                                    <button className="avatar-button"><img src={acc.avatar} width={80}/></button>
                                    <button className="name-button">{acc.name}</button>
                                </div>
                                <div>
                                    <button className="hobby-field-button">Hobby</button>
                                    <button className="friend-input-button">{acc.hobby}</button>
                                </div>
                                <div>
                                    <button className="tagline-field-button">Tagline</button>
                                    <button className="friend-input-button">{acc.tagline}</button>
                                </div>
                                <div>
                                    <button className="year-field-button">Year</button>
                                    <button className="friend-input-button">{acc.year}</button>
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
        } else {
            return (
                <div>
                    <div className="overlay">
                        <div className="popup">
                            <button className="close-button" onClick={onClose}>X</button>
                            <div>
                                This user is no longer using NUSConnect.
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        return <div>You do not have an account.</div>
    }

};

export default FriendProfileModal;