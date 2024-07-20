import React, { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, collection, query, where, addDoc, getDocs} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {updateFieldInUserData, UserData} from "../../../UserData.js";
import {useNavigate} from "react-router-dom";

const TutorProfileModal = ({ userId, onClose }) => {
    // todo : implement using local storage
    const [acc, setAcc] = useState(null);
    const userIDOfOtherUser = userId
    const [loading, setLoading] = useState(true);

    let nav = useNavigate()

    const db = getFirestore();

    useEffect(() => {
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
    }, []); // dependency is empty because the toUserId is not expected to change

    const startChat = async () => {
        const chatRoomsRef = collection(db, 'chatrooms');
        const q = query(chatRoomsRef, where('participants', 'array-contains', UserData.userID));

        try {
            console.log('Querying docs');
            const chatRoomDocs = await getDocs(q);
            console.log('Docs received');

            let chatRoomDoc = null;

            chatRoomDocs.forEach((doc) => {
                const data = doc.data();
                if (data.participants.includes(userIDOfOtherUser)) {
                    chatRoomDoc = doc;
                }
            });

            if (chatRoomDoc) {
                console.log('ChatRoomDoc is not null');
                updateFieldInUserData({
                    inChatRoom: chatRoomDoc.id,
                    userIDOfToUser: userIDOfOtherUser,
                    toUserData: acc
                });
                nav('/chat');
            } else {
                console.log('No existing chat room found, creating a new one');
                throw new Error("No existing chat room found");
            }
        } catch (err) {
            console.log('Querying failed', err);
            try {
                const participantsArr = [UserData.userID, userIDOfOtherUser];
                const newChatRoom = await addDoc(chatRoomsRef, { participants: participantsArr });
                if (newChatRoom !== null) {
                    updateFieldInUserData({
                        inChatRoom: newChatRoom.id,
                        userIDOfToUser: userIDOfOtherUser,
                        toUserData: acc
                    });
                    nav('/chat');
                }
            } catch (err) {
                console.log("ChatRoom creation failed.", err);
            }
        }
    };

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

