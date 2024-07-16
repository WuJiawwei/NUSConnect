import { useEffect, useState } from 'react';
import {getFirestore, getDoc, doc, collection, query, where, updateDoc, arrayUnion, addDoc} from 'firebase/firestore';
import "./index.scss"
import {FaComment} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {UserData,  updateFieldInUserData} from "../../../UserData.js"

const FriendProfileModal = ({ userId, onClose }) => {
    const [acc, setAcc] = useState(null); // is ToUser
    const [loading, setLoading] = useState(true);

    let nav = useNavigate()

    const db = getFirestore();

    useEffect(() => {
        const docRef = doc(db, 'users', userId);
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