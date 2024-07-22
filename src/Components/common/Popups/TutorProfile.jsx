import React, { useEffect, useState } from 'react';
import {
    getFirestore,
    getDoc,
    doc,
    collection,
    query,
    where,
    addDoc,
    getDocs,
    updateDoc,
    arrayUnion
} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {updateFieldInUserData, UserData} from "../../../UserData.js";
import {useNavigate} from "react-router-dom";

const TutorProfileModal = ({ userId, onClose }) => {

    const [acc, setAcc] = useState(null);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const nav = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(db, 'users', userId);
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

    //todo: use memoization

    const startChat = async () => {
        const chatRoomsRef = collection(db, 'chatrooms');
        const q = query(chatRoomsRef, where('participants', 'array-contains', UserData.userID));
        try {
            const chatRoomDocs = await getDocs(q);
            let chatRoomDoc = null;
            chatRoomDocs.forEach((doc) => {
                const data = doc.data();
                if (data.participants.includes(userId)) {
                    chatRoomDoc = doc;
                }
            });

            if (chatRoomDoc !== null) {
                console.log('ChatRoomDoc is not null');
                updateFieldInUserData({
                    inChatRoom: chatRoomDoc.id,
                    userIDOfToUser: userId,
                    toUserData: acc
                });
                nav('/chat');
            } else {
                console.log('No existing chat room found, creating a new one');
                await createNewChatRoom();
            }
        } catch (err) {
            console.error('Error fetching chat rooms:', err);
            await createNewChatRoom();
        }
    };

    const createNewChatRoom = async () => {
        try {
            const chatRoomsRef = collection(db, 'chatrooms');
            const usersRef = collection(db, 'users');
            const participantsArr = [UserData.userID, userId];
            const newChatRoom = await addDoc(chatRoomsRef, { participants: participantsArr });
            await updateDoc(doc(usersRef, UserData.userID), { chatRooms: arrayUnion(newChatRoom.id) });
            await updateDoc(doc(usersRef, userId), { chatRooms: arrayUnion(newChatRoom.id) });

            if (newChatRoom !== null) {
                updateFieldInUserData({
                    inChatRoom: newChatRoom.id,
                    userIDOfToUser: userId,
                    toUserData: acc
                });
                nav('/chat');
            }
        } catch (err) {
            console.error('ChatRoom creation failed.', err);
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

