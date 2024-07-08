import "./index.scss"
import {useState} from "react";
import {getFirestore, doc, getDoc, updateDoc, arrayRemove} from "firebase/firestore";
import {FaTrash} from "react-icons/fa";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import {useNavigate} from "react-router-dom";

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
        const db = getFirestore();
        try {
            const docRef = await doc(db, "users", currUser.userID);
            await updateDoc(docRef, {contacts: arrayRemove(id)})
            // removes all instances
        } catch (err) {
            console.log(err);
        }
    }

    let nav = useNavigate()

    const startChat = async () => {
        const db = getFirestore();
        if (currUser !== null) {
            try {
                const docRef = doc(db, "users", currUser.userID);
                await updateDoc(docRef, {currentlyTexting: id})
                nav("/chat")
            } catch (err) {
                console.error(err);
            }
        } else {
            console.log("You do not have an account.")
        }
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