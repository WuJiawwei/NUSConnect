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
        console.log(currUser)
        nav("/allchats")
    }

    const [message, setMessage] = useState("")

    const sendTextMessage = async () => {
        // todo : use socket io
    }

    if (currUser !== null && currUser.currentlyTexting !== null) {
        return <div>
            <div className = "top-chat-bar">
                <button className="go-back-button" onClick={handleBackNav}>
                    <FaChevronLeft/>
                </button>
                <div className="to-user-avatar">
                    <img src={UserData.currentlyTexting.avatar} width={50}/>
                </div>
                <div className="to-user-name">
                    {UserData.currentlyTexting.name}
                </div>
            </div>
            <div className="message-container">Messages go here</div>
            <div className="send-message-bar">
                <img className="from-user-avatar" src={UserData.avatar} width={50}/>
                <input
                    className="input-message-bar"
                    placeholder="Your message..."
                    onChange={(e)=>{setMessage(e.target.value)}}
                />
                <button
                    className="send-message-button"
                    onClick={sendTextMessage}
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
    }
}

export default Chat