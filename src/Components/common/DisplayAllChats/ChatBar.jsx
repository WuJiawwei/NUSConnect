import "./index.scss"
import {useState} from "react";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import {FaTrash} from "react-icons/fa";

const ChatBar = ({id}) => {
    const [toUser, setToUser] = useState(null);

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

    getToUserDetails();

    if (toUser !== null && toUser !== undefined) {
        return (<div className="chat-bar">
            <button className="trash-contact"><FaTrash/></button>
            <div className="contact-avatar">
                <img src={toUser.avatar} width={50}/>
            </div>
            <div className="contact-name">{toUser.name}</div>
            <button className="contact-chat-button">Chat</button>
        </div>)
    }
}

export default ChatBar