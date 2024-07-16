import "./index.scss"
import {useState, useEffect} from "react";
import {getFirestore, doc, getDoc, updateDoc, arrayRemove, collection} from "firebase/firestore";
import {FaTrash} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../UserData.js"

const ChatBar = ({id}) => {
    const [toUser, setToUser] = useState(null);
    const currUser = UserData
    const db = getFirestore();

    useEffect(() => {
        const getToUserDetails = async () => {
            try {
                const docRef = await doc(db, "users", id)
                const actualDoc = await getDoc(docRef);
                if (actualDoc.exists()) {
                    setToUser(actualDoc.data());
                }
            } catch (err) {
                console.error(err);
            }
        }
        getToUserDetails();
    }, [])

    const removeChat = async () => {
        try {
            const dbRef = collection(db, "users");
            const docRef = await doc(dbRef, UserData.userID)
            await updateDoc(docRef, {contacts : arrayRemove(id)});
        } catch (err) {
            console.log("Contact deletion failed.")
        }
    }

    let nav = useNavigate()

    const startChat = () => {
        if (currUser !== null) {
            currUser.currentlyTexting = toUser
            nav("/chat")
        } else {
            console.log("You do not have an account.")
        }
    }

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