import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import Topbar from "../Topbar/index.jsx";
import {useState} from "react";
import {FaChevronLeft, FaFileUpload, FaPaperPlane} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "./index.scss"
import {getFirestore, doc, updateDoc, getDoc} from "firebase/firestore";

const Chat = () => {
    const [currUser, setCurrUser] = useState(null)
    const [toUser, setToUser] = useState(null)
    const nav = useNavigate()

    getCurrentUser(setCurrUser)
    const db = getFirestore()

    const getToUserAccountDetails = async () => {
        if (currUser !== null) {
            try {
                const docRef = doc(db, "users", currUser.currentlyTexting)
                const toUserDetails = await getDoc(docRef)
                setToUser(toUserDetails.data())
            } catch (err) {
                console.log(err)
            }
        }
    }

    getToUserAccountDetails()

    const handleBackNav = async () => {
        if (currUser !== null) {
            const currUserId = currUser.userID;
            try {
                const docRef = doc(db, "users", currUserId)
                await updateDoc(docRef, {currentlyTexting: ""})
                nav("/allchats")
            } catch (err) {
                console.log(err)
            }
        } else {
            console.log("You don't have an account.")
        }
    }

    if (currUser !== null && toUser !== null) {
        return <div>
            <Topbar/>
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
            <div className="text-messages"></div>
            <div className="send-message-bar">
                <img className="from-user-avatar" src={currUser.avatar} width={50}/>
                <input className="input-message-bar"/>
                <button className="send-message-button"><FaPaperPlane/></button>
                <button className="file-upload-button"><FaFileUpload/></button>
            </div>
        </div>
    }
}

export default Chat