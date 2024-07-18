import {useState, useEffect} from "react";
import {FaChevronLeft, FaFileUpload, FaPaperPlane} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import {getFirestore, doc, getDoc, collection, updateDoc, arrayUnion} from "firebase/firestore";
import {UserData, updateFieldInUserData} from "../../../UserData.js"
import TextMessage from "./message.js"

const Chat = () => {
    const currUser = UserData
    let nav = useNavigate();
    const [toUser, setToUser] = useState(null);

    //todo : display text messages that have been already sent

    const db = getFirestore();
    const chatRoomsRef = collection(db, "chatrooms");
    const chatRoomRefOfCurrUser = doc(chatRoomsRef, UserData.inChatRoom);
    const [chatRoomIdOfOtherUser, setChatRoomIdOfOtherUser] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const usersRef = collection(db, "users");
            try {
                const chatRoomDoc = await getDoc(chatRoomRefOfCurrUser);
                if (chatRoomDoc.exists()) {
                    const idOfToUser = chatRoomDoc.data().to;
                    try {
                        const docRefOfToUser = doc(usersRef, idOfToUser)
                        const docOfToUser = await getDoc(docRefOfToUser)
                        if (docOfToUser.exists()) {
                            setToUser(docOfToUser.data())
                            try {
                                const id = await findChatRoomRefOfOtherUser()
                                setChatRoomIdOfOtherUser(id)
                            } catch (err) {
                                console.log(err)
                            }
                        }
                    } catch (err) {
                        setToUser(null);
                        // todo : maybe do a popup that shows the user is no longer using NUSConnect?
                    }
                }
            } catch (err) {
                console.log("The chat does not exist.")
            }
        }
        fetchData()
    }, []); //todo : fill up dependencies

    const [message, setMessage] = useState("")

    const findChatRoomRefOfOtherUser = async () => {
        if (toUser !== null) {
            const ChatRoomIdsOfOtherUser = toUser.chatRooms
            for (let i = 0; i < ChatRoomIdsOfOtherUser.length; i++) {
                const docRef = doc(chatRoomsRef, ChatRoomIdsOfOtherUser[i]);
                try {
                    const actualDoc = await getDoc(docRef);
                    if (actualDoc.exists()) {
                        if (actualDoc.data().to === UserData.userID) {
                            console.log(actualDoc.id);
                            return actualDoc.id;
                        }
                    }
                } catch (err) {
                    console.log("This is not the correct room.")
                }
            }
        }
    }

    const handleBackNav = () => {
        updateFieldInUserData({inChatRoom : "" })
        nav("/allchats")
    }

    const sendTextMessage = async () => {
        const textToSend = new TextMessage(message, UserData.userID)
        let stringifiedText = JSON.stringify(textToSend)
        try {
            await updateDoc(chatRoomRefOfCurrUser, {messages: arrayUnion(stringifiedText)})
            if (chatRoomIdOfOtherUser !== null) {
                const docRef = doc(chatRoomsRef, chatRoomIdOfOtherUser)
                try {
                    await updateDoc(docRef, {chatRooms : arrayUnion(stringifiedText)})
                } catch (err) {
                    console.log("The update was not successful.")
                }
            }
        } catch (err) {
            console.log("Message has not been delivered.")
        }
    }

    if (toUser !== null && UserData !== null) {
        return <div>
            <div className="top-chat-bar">
                <button className="go-back-button" onClick={handleBackNav}>
                    <FaChevronLeft/>
                </button>
                <div className="to-user-avatar">
                    <img src={toUser.avatar} width={50}/>
                </div>
                <div className="to-user-name">
                    {toUser.name}
                </div>
            </div>
            This is chat.
            The id is {UserData.inChatRoom}
            <div className="send-message-bar">
                <img className="from-user-avatar" src={UserData.avatar} width={50}/>
                <input
                    className="input-message-bar"
                    placeholder="Your message..."
                    onChange={(e) => {
                        setMessage(e.target.value)
                    }}
                />
                <button
                    className="send-message-button"
                    onClick = {sendTextMessage}
                >
                    <FaPaperPlane/>
                </button>
                <button className="file-upload-button">
                    <FaFileUpload/>
                </button>
            </div>
        </div>
    } else if (UserData === null) {
        return <div>You do not have an account.</div>
    } else {
        return <div>The user you are trying to contact is no longer using NUSConnect.</div>
    }
}

export default Chat