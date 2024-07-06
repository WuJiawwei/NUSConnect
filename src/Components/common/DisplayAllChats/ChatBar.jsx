import "./index.scss"
import {useState} from "react";
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
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
        const i = getIndex()
        const currContacts = currUser.contacts
        const db = getFirestore()
        const docRef = doc(db, "users", currUser.userID)
        if (i === 0) {
            currContacts.shift()
            try {
                await updateDoc(docRef, {contacts : currContacts});
            } catch (err) {
                console.error(err);
            }
        } else if (i === currContacts.length - 1) {
            currContacts.pop()
            try {
                await updateDoc(docRef, {contacts : currContacts});
            } catch (err) {
                console.error(err);
            }
        } else {
            const lenOfFirstPart = i;
            const firstPart = [];
            const lenOfLastPart = currContacts.length - i - 1;
            const lastPart = [];
            let j = 0;
            for (let i = 0; i < lenOfFirstPart; i++) {
                firstPart.push(currContacts[j]);
                j++;
            }
            j++;
            for (let k = 0; k < lenOfLastPart; k++) {
                lastPart.push(currContacts[j]);
                j++;
            }
            const newContacts = firstPart.concat(lastPart);
            try {
                await updateDoc(docRef, {contacts : newContacts});
            } catch (err) {
                console.error(err);
            }
        }
    }

    const getIndex = () => {
        const currContacts = currUser.contacts
        for (let i = 0; i < currContacts.length; i++) {
            if (currContacts[i] === id) {
                return i;
            }
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