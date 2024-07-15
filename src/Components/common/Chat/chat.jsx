/*import {useState} from "react";
import {FaChevronLeft, FaFileUpload, FaPaperPlane} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import {getFirestore, doc, getDoc, collection} from "firebase/firestore";
import {UserData} from "../../../UserData.js"

const Chat = () => {
    const [toUser, setToUser] = useState(null) // contains all data of toUser
    const nav = useNavigate()
    const currUser = UserData
    const db = getFirestore()
    /*
    * todo:
    *  functions: texting (will not implement chat deletion)

    const getToUserAccountDetails = () => {
        setToUser(UserData.currentlyTexting)
    }
    getToUserAccountDetails()

    const handleBackNav = () => {
        UserData.currentlyTexting = {}
        console.log(currUser)
        nav("/allchats")
    }

    const sendMessage = async () => {
        // todo
    }

    return <div>This is chat</div>

    if (currUser !== null && toUser !== null) {
        return <div>
            <div
                className="top-chat-bar"
            >
                <button
                    className="go-back-button"
                    onClick={handleBackNav}
                >
                    <FaChevronLeft/>
                </button>
                <div className="to-user-avatar">
                    <img src={toUser.avatar} width={50}/>
                </div>
                <div className="to-user-name">
                    {toUser.name}
                </div>
            </div>
            <section className="message-container">
            </section>
            <div className="send-message-bar">
                <img className="from-user-avatar" src={currUser.avatar} width={50}/>
                <input className="input-message-bar" placeholder="Your message..." />
                <button
                    className="send-message-button"
                    onClick={sendMessage}
                >
                    <FaPaperPlane/>
                </button>
                <button className="file-upload-button"><FaFileUpload/></button>
            </div>
        </div>
    } else if (toUser === null) {
        return <div>This user is no longer using NUSConnect.</div>
    } else {
        return <div>You do not have an account.</div>
    }
}

export default Chat**/

const Chat = () => {
    return <div>This is chat.</div>
}

export default Chat