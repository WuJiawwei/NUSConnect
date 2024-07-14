import {useState} from "react";
import {FaChevronLeft, FaFileUpload, FaPaperPlane} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import {getFirestore, doc, getDoc, collection} from "firebase/firestore";
import {UserData} from "../../../UserData.js"

const Chat = () => {
    const [toUser, setToUser] = useState(null)
    const nav = useNavigate()
    const currUser = UserData
    const db = getFirestore()

    const getToUserAccountDetails = async () => {
        try {
            const dbRef = collection(db, "users")
            const docRef = doc(dbRef, UserData.currentlyTexting)
            const actualDoc = await getDoc(docRef);
            if (actualDoc.exists()) {
                setToUser(actualDoc.data());
            }
        } catch (err) {
            console.log("User is no longer using NUSconnect.")
        }
    }
    getToUserAccountDetails()

    const handleBackNav = () => {
        UserData.currentlyTexting = ""
        console.log(currUser)
        nav("/allchats")
    }

    const sendMessage = async () => {
        // todo
    }

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

export default Chat