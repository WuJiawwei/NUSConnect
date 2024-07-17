import "./index.scss"
import {useState, useEffect} from "react";
import {getFirestore, doc, getDoc, updateDoc, arrayRemove, collection} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../UserData.js"
import {FaTrash} from "react-icons/fa";

const ChatBar = ({ChatRoomId}) => {
    // id
    const [toUser, setToUser] = useState(null);
    const currUser = UserData
    const db = getFirestore();
    // todo : fix ChatBar implementation

    /*todo:
    *  functions: search contact, delete contact*/

    /*useEffect(() => {
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
        //todo
    }

    let nav = useNavigate()

    const startChat = () => {
        //todo
    }*/

    if (true) {
        return (<div className="chat-bar">
            <button
                className="trash-contact"
            >
                <FaTrash/>
            </button>
            <div className="contact-avatar">
                {/*<img src={toUser.avatar} width={50}/>*/}
            </div>
            <div className="contact-name">The chat room id </div>
            <button
                className="contact-chat-button"
            >
                Chat
            </button>
        </div>)
    }
}

export default ChatBar