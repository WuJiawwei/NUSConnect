import React, { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, updateDoc, arrayUnion, collection, query, where, addDoc} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {updateFieldInUserData, UserData} from "../../../UserData.js";
import {useNavigate} from "react-router-dom";

const TutorProfileModal = ({ userId, onClose }) => {
    // todo : implement using local storage
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

    const startChat = async () => {
        const dataOfAllChatRooms = await getDataOfAlChatRooms()
        const filteredData = dataOfAllChatRooms.filter(data => data.to === userId && data.from === UserData.userID);
        const chatRoomsRef = collection(db, 'chatrooms');
        const dbUsersRef = collection(db, 'users');
        if (filteredData.length === 0) {
            try {
                const newChatroomRef1 = await addDoc(chatRoomsRef, {
                    to: userId,
                    from: UserData.userID,
                });
                const newChatroomRef2 = await addDoc(chatRoomsRef, {
                    to: UserData.userID,
                    from: userId,
                });
                const docRef1 = doc(dbUsersRef, UserData.userID);
                const docRef2 = doc(dbUsersRef, userId)
                await updateDoc(docRef1, {chatRooms : arrayUnion(newChatroomRef1.id)});
                await updateDoc(docRef2, {chatRooms : arrayUnion(newChatroomRef2.id)});
                updateFieldInUserData({inChatRoom : newChatroomRef1.id});
                nav("/chat")
            } catch(err) {
                console.log(err)
            }
        } else {
            updateFieldInUserData({inChatRoom : dataOfAllChatRooms[0][0]});
            nav('/chat')
        }
    }

    const getDataOfAlChatRooms = async () => {
        const dbRef = collection(db, "chatrooms");
        const dataOfAllChatRooms = [];
        for (let i = 0; i < UserData.chatRooms.length; i++) {
            try {
                const docRef = doc(dbRef, UserData.chatRooms[i]);
                const actualDoc = await getDoc(docRef);
                if (actualDoc.exists()) {
                    dataOfAllChatRooms.push([actualDoc.id, actualDoc.data()]);
                }
            } catch (err) {
                console.log("The doc does not exist.")
            }
        }
        return dataOfAllChatRooms;
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

