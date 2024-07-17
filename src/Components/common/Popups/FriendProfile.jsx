import { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, collection, query, where, updateDoc, arrayUnion, addDoc} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {UserData, updateFieldInUserData} from "../../../UserData.js"

const FriendProfileModal = ({ userId, onClose }) => {
    // todo : implement using local storage
    const [acc, setAcc] = useState(null); // is ToUser
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