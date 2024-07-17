import {useState, useEffect} from "react";
import {FaChevronLeft, FaFileUpload, FaPaperPlane} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import {getFirestore, doc, getDoc, collection} from "firebase/firestore";
import {UserData} from "../../../UserData.js"

const Chat = () => {
    const currUser = UserData
    let nav = useNavigate();
    const handleBackNav = () => {
        //todo
    }

    const [message, setMessage] = useState("")

    return <div>
        This is chat.
        The id is {UserData.inChatRoom}
    </div>

    /*if (currUser !== null && currUser.currentlyTexting !== null) {
        return <div>
            <div className = "top-chat-bar">
                <button className="go-back-button" onClick={handleBackNav}>
                    <FaChevronLeft/>
                </button>
                <div className="to-user-avatar">
                    <img src= width={50}/>
                </div>
                <div className="to-user-name">
                    {UserData.currentlyTexting.name}
                </div>
            </div>
            <div className="message-container">
                The chatroom id is {UserData.chatRoomID}
            </div>
            <div className="send-message-bar">
                <img className="from-user-avatar" src={UserData.avatar} width={50}/>
                <input
                    className="input-message-bar"
                    placeholder="Your message..."
                    onChange={(e)=>{setMessage(e.target.value)}}
                />
                <button
                    className="send-message-button"
                >
                    <FaPaperPlane/>
                </button>
                <button className="file-upload-button">
                    <FaFileUpload/>
                </button>
            </div>
        </div>
    } else if (UserData === null) {
        return <div>You need an account to chat with someone.</div>
    } else {
        return <div>The person you are trying to connect with is not using NUSConnect.</div>
    }*/
}

export default Chat