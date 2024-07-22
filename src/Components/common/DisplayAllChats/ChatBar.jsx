import "./index.scss"
import {useState, useEffect} from "react";
import {getFirestore, doc, getDoc, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {UserData, updateFieldInUserData} from "../../../UserData.js"
import {FaTrash} from "react-icons/fa";

const ChatBar = ({ChatRoomId}) => {

    //todo : implement with memoization ? -> try to do also for search, display all
    // chats and other related components

    const [toUserId, setToUserId] = useState(null);
    const [toUser, setToUser] = useState(null);
    const db = getFirestore();

    useEffect(() => {
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
    fetchData()


    // todo : use memoization
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