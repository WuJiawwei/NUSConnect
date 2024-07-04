import "./index.scss"
import {useState} from "react";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import {FaTrash} from "react-icons/fa";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";

const ChatBar = ({id}) => {
    const [toUser, setToUser] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    getCurrentUser(setCurrUser)

    const getToUserDetails = async () => {
        try {
            const db = getFirestore();
            const docRef = await doc(db, "users", id)
            const actualDoc = await getDoc(docRef);
            if (actualDoc.exists()) {
                setToUser(actualDoc.data());
            }
        } catch (err) {
            console.error(err);
        }
    }

    const removeChat = async () => {
    }

    getToUserDetails();

    if (toUser !== null) {
        return (<div className="chat-bar">
            <button
                className="trash-contact"
                onClick={removeChat}
            >
                <FaTrash/>
            </button>
            <div className="contact-avatar">
                <img src={toUser.avatar} width={50}/>
            </div>
            <div className="contact-name">{toUser.name}</div>
            <button className="contact-chat-button">Chat</button>
        </div>)
    }
}

export default ChatBar