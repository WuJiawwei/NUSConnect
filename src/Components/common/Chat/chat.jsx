import {useEffect, useState} from "react";
import {FaChevronLeft, FaPaperPlane} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import "./index.scss";
import {getFirestore, collection, doc, updateDoc, arrayUnion, onSnapshot} from "firebase/firestore";
import {UserData, updateFieldInUserData} from "../../../UserData.js";
import TextMessage from "./message.js";
import SentMessage from "./SentMessage.jsx";

const Chat = () => {

    const [message, setMessage] = useState('');
    const [allSentMessages, setAllSentMessages] = useState([]);
    let nav = useNavigate();
    const handleBackNav = () => {
        updateFieldInUserData({ inChatRoom: "", userIDOfToUser: "", toUserData: {} });
        console.log(UserData)
        nav("/allchats");
    };

    const sendMessage = async () => {
        const textToSendInJs = new TextMessage(message, UserData.userID);
        const textMessageInJSON = JSON.stringify(textToSendInJs);
        setMessage('');
        try {
            const db = getFirestore();
            const chatRoomsRef = collection(db, "chatrooms");
            await updateDoc(doc(chatRoomsRef, UserData.inChatRoom), { messages: arrayUnion(textMessageInJSON) });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const db = getFirestore();
        const chatRoomsRef = collection(db, 'chatrooms');
        const docRef = doc(chatRoomsRef, UserData.inChatRoom);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                try {
                    const messagesSent = snapshot.data().messages;
                    const parsedMessages = messagesSent.map((message, index) => {
                        const parsedMessage = JSON.parse(message);
                        return { id: index, message: parsedMessage };
                    });
                    setAllSentMessages(parsedMessages);
                    console.log("Retrieved sent messages.")
                } catch (err) {
                    console.log(err);
                }
            }
        });

        return () => unsubscribe();
    }, [UserData.inChatRoom]);


    if (UserData !== null && UserData.toUserData !== null) {
        return (
            <div>
                <div className="top-chat-bar">
                    <button className="go-back-button" onClick={handleBackNav}>
                        <FaChevronLeft />
                    </button>
                    <div className="to-user-avatar">
                        <img src={UserData.toUserData.avatar} width={50} />
                    </div>
                    <div className="to-user-name">
                        {UserData.toUserData.name}
                    </div>
                </div>
                <div className="messages-container">
                    {allSentMessages.length === 0 ? (
                        <div className="no-messages-yet-text">
                            Be the first to send a message.
                        </div>
                    ) : (
                        <div className="messages-container">
                            {allSentMessages.map(m => (
                                <div key={m.id}>
                                    <SentMessage
                                        time={m.message.time}
                                        by={m.message.by}
                                        text={m.message.text}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="send-message-bar">
                    <img className="from-user-avatar" src={UserData.avatar} width={50}/>
                    <input
                        className="input-message-bar"
                        placeholder="Text something or send a link..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}/>
                    <button className="send-message-button" onClick={sendMessage}>
                        <FaPaperPlane/>
                    </button>
                </div>
            </div>
        );
    }
};

export default Chat;
