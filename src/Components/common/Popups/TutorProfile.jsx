import React, { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, updateDoc, arrayUnion, collection, query, where, addDoc} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {updateFieldInUserData, UserData} from "../../../UserData.js";
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
    }, []);

    const db = getFirestore();
    const dbRef = collection(db, 'users');

    const startChat = async () => {
        const dbUsersRef = collection(db, 'users');
        const chatRoomsRef = collection(db, 'chatrooms');
        if (bothAreInContact()) {
            try {
                const q = query(chatRoomsRef,
                    where('to', '==', userId), where('from', '==', UserData.userID))
                const doc = await getDoc(q);
                if (doc.exists()) {
                    updateFieldInUserData({chatRoom : doc, chatRoomId : doc.id});
                    nav("/chat")
                }
            } catch (err) {
                console.log("The chat room cannot be opened.")
            }
        } else {
            try {
                const newChatroomRef1 = await addDoc(chatRoomsRef, {
                    to: userId,
                    from: UserData.userID,
                });
                await addDoc(chatRoomsRef, {
                    to: UserData.userID,
                    from: userId,
                });
                const docRef1 = doc(dbUsersRef, UserData.userID);
                const docRef2 = doc(dbUsersRef, userId)
                await updateDoc(docRef1, {contacts : arrayUnion(userId)});
                await updateDoc(docRef2, {contacts : arrayUnion(UserData.userID)});
                const idOfRoomToNavTo = newChatroomRef1.id
                updateFieldInUserData({chatRoom : newChatroomRef1, chatRoomId : idOfRoomToNavTo});
                nav("/chat")
            } catch(err) {
                console.log(err)
            }
        }
    }

    const bothAreInContact = () => {
        return acc.contacts.includes(UserData.userID) && UserData.contacts.includes(userId);
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

