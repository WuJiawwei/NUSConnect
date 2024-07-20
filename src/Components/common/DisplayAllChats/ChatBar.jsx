import "./index.scss"
import {useState, useEffect} from "react";
import {getFirestore, doc, getDoc, updateDoc, arrayRemove, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {UserData, updateFieldInUserData} from "../../../UserData.js"
import {FaTrash} from "react-icons/fa";

const ChatBar = ({ChatRoomId}) => {

    // todo
    // id
    /*const [toUser, setToUser] = useState(null);
    const db = getFirestore();

    useEffect(() => {
        const fetchData = async () => {
            const chatRoomsRef = collection(db, "chatrooms");
            const usersRef = collection(db, "users")
            const chatRoomDocRef = doc(chatRoomsRef, ChatRoomId);
            try {
                const chatRoomDoc = await getDoc(chatRoomDocRef);
                if (chatRoomDoc.exists()) {
                    const toUserDocRef = doc(usersRef, chatRoomDoc.data().to);
                    try {
                        const toUserDoc = await getDoc(toUserDocRef);
                        if (toUserDoc.exists()) {
                            setToUser(toUserDoc.data());
                            console.log(toUser);
                        }
                    } catch (err) {
                        setToUser(null);
                        console.log("This user does not exist.")
                    }
                }
            } catch (err) {
                console.log("The chat does not exist.")
            }
        }
        fetchData()
    }, []) // todo: add dependencies


    let nav = useNavigate()

    const startChat = () => {
        updateFieldInUserData({inChatRoom : ChatRoomId})
        nav("/chat")
    }

    if (toUser !== null && UserData !== null) {
        return (<div className="chat-bar">
            <button
                className="trash-contact"
            >
                <FaTrash/>
            </button>
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
    } else {
        return <div>You do not have an account.</div>
    }*/
}

export default ChatBar