import ChatBar from "./ChatBar.jsx"
import "./index.scss"
import Topbar from "../Topbar/index.jsx"
import {getFirestore, collection, doc, onSnapshot} from "firebase/firestore";
import {useEffect, useState} from "react";
import {UserData} from "../../../UserData.js"

const DisplayAllChats = () => {

    const db = getFirestore()
    const [chatRoomsIds, setChatRoomsIds] = useState([])

    useEffect(() => {
        const usersDbRef = collection(db, 'users');
        const docRef = doc(usersDbRef, UserData.userID);

        const unSub = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                try {
                    const chatrooms = doc.data().chatRooms
                    setChatRoomsIds(chatrooms)
                    console.log("Retrieved chatRooms")
                } catch (err) {
                    console.log(err)
                }
            }
        })
        return () => unSub()
    }, [UserData.userID])

    if (UserData !== null) {
        return (<div>
            <Topbar/>
            {chatRoomsIds === null ?
                <div className="chats-container">
                    <div>You do not have any contacts.</div>
                </div>
                : <div className="chats-container">
                    {chatRoomsIds.map((roomId) => <div key={roomId}><ChatBar ChatRoomId={roomId}/></div>)}
                </div>}
        </div>)
    } else {
        return <div>You don't have an account.</div>
    }
}

export default DisplayAllChats;