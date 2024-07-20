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

    return <div>{currUser.inChatRoom}</div>
    /*if (toUser !== null && UserData !== null) {
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
    }*/
}

export default Chat