import ChatBar from "./ChatBar.jsx"
import "./index.scss"
import Topbar from "../Topbar/index.jsx"
import {getFirestore, collection, doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {UserData} from "../../../UserData.js"

const DisplayAllChats = () => {

    //todo : use memoization

    const db = getFirestore()
    const [chatRoomsIds, setChatRoomsIds] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const usersDbRef = collection(db, 'users');
            const docRef = doc(usersDbRef, UserData.userID);
            try {
                const actualDoc = await getDoc(docRef);
                if (actualDoc.exists()) {
                    const res = actualDoc.data().chatRooms;
                    setChatRoomsIds(res);
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []); // todo : add dependencies

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