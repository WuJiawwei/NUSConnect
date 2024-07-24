import "./index.scss"
import {useState, useEffect} from "react";
import {getFirestore, doc, getDoc, collection, onSnapshot} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {UserData, updateFieldInUserData} from "../../../UserData.js"
import {FaTrash} from "react-icons/fa";

const ChatBar = ({ChatRoomId}) => {

    const [toUserId, setToUserId] = useState(null);
    const [toUser, setToUser] = useState(null);
    const db = getFirestore();

    /*useEffect(() => {
    }, [])

    const fetchData = async () => {
        const chatRoomsRef = collection(db, 'chatrooms')
        const chatDocRef = doc(chatRoomsRef, ChatRoomId);
        try {
            const chatDoc = await getDoc(chatDocRef);
            if (chatDoc.exists()) {
                const participantsArr = chatDoc.data().participants;
                for (let i = 0; i < participantsArr.length; i++) {
                    if (participantsArr[i] !== UserData.userID) {
                        setToUserId(participantsArr[i]);
                    }
                }
            }
        } catch (err) {
            console.log(err)
        }
        if (toUserId !== null) {
            const usersRef = collection(db, 'users');
            const toUserDocRef = doc(usersRef, toUserId);
            try {
                const actualToUserDoc = await getDoc(toUserDocRef);
                if (actualToUserDoc.exists()) {
                    setToUser(actualToUserDoc.data());
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
    fetchData()*/

    /*useEffect(() => {
        const chatRoomsRef = collection(db, 'chatrooms')
        const chatDocRef = doc(chatRoomsRef, ChatRoomId);
        const usersRef = collection(db, 'users');
        const unSub = onSnapshot(chatDocRef, (d) => {
            if (d.exists()) {
                const participantsArr = d.data().participants;
                for (let i = 0; i < participantsArr.length; i++) {
                    if (participantsArr[i] !== UserData.userID) {
                        setToUserId(participantsArr[i]);
                        break;
                    }
                }
                if (toUserId !== null) {
                    const toUserDocRef = doc(usersRef, toUserId);
                    getDoc(toUserDocRef)
                        .then((actualToUserDoc) => {
                            if (actualToUserDoc.exists()) {
                                setToUser(actualToUserDoc.data());
                                console.log("Created chatbar")
                            }
                        }).catch((err) => {
                            console.log(err)
                    })
                } else {
                    console.log("No such user.")
                }
            }
        })
        return () => unSub()
    }, [ChatRoomId, UserData.userID])*/

    useEffect(() => {
        const chatRoomsRef = collection(db, 'chatrooms');
        const chatDocRef = doc(chatRoomsRef, ChatRoomId);
        const usersRef = collection(db, 'users');

        const unsubscribe = onSnapshot(chatDocRef, (d) => {
            if (d.exists()) {
                const participantsArr = d.data().participants;
                let foundToUserId = null;

                for (let i = 0; i < participantsArr.length; i++) {
                    if (participantsArr[i] !== UserData.userID) {
                        foundToUserId = participantsArr[i];
                        break;
                    }
                }

                if (foundToUserId !== null) {
                    setToUserId(foundToUserId);
                    const toUserDocRef = doc(usersRef, foundToUserId);
                    getDoc(toUserDocRef)
                        .then((actualToUserDoc) => {
                            if (actualToUserDoc.exists()) {
                                setToUser(actualToUserDoc.data());
                                console.log("ChatBar created.")
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        });
                } else {
                    console.log('No other participants found in chat room');
                    setToUserId(null);
                    setToUser(null);
                }
            } else {
                console.log('Chat room document does not exist');
                setToUserId(null);
                setToUser(null);
            }
        });

        return () => unsubscribe();
    }, [ChatRoomId, UserData.userID]);


    let nav = useNavigate()

    const startChat = () => {
        updateFieldInUserData({inChatRoom : ChatRoomId, userIDOfToUser : toUserId, toUserData : toUser})
        console.log(UserData)
        nav("/chat")
    }

    if (toUser !== null) {
        return (<div className="chat-bar">
            <div className="contact-avatar">
                <img src={toUser.avatar} width={50}/>
            </div>
            <div className="contact-name">{toUser.name}</div>
            <button
                className="contact-chat-button"
                onClick={startChat}
            >
                Chat
            </button>
        </div>)
    }
}

export default ChatBar