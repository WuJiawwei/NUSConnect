import ChatBar from "./ChatBar.jsx"
import "./index.scss"
import {FaRocket, FaSearch, FaTimes} from "react-icons/fa";
import Topbar from "../Topbar/index.jsx"
import {getFirestore, collection, doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {UserData} from "../../../UserData.js"

const DisplayAllChats = () => {
    const db = getFirestore()
    const usersDbRef = collection(db, 'users')
    const chatroomsDbRef = collection(db, 'chatrooms')
    const [chatRoomsIds, setChatRoomsIds] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const currUserId = UserData.userID
            const docRef = doc(usersDbRef, currUserId);
            const actualDoc = await getDoc(docRef);
            if (actualDoc.exists()) {
                setChatRoomsIds(actualDoc.data().chatRooms)
            }
        }
        fetchData()
    }, []) // todo : add dependencies

    if (UserData !== null) {
        return (<div>
            <Topbar/>
            <div className="search-container">
                <div className="search-box">
                    <FaSearch className="search-icon"/>
                    <input
                        className="input"
                        placeholder="Search your contacts"
                    />
                    {/*}
                    {onSearch ?
                        <button
                            className="terminate-search-button"
                        >
                            <FaTimes/>
                            Terminate search
                        </button>
                        :
                        <button
                            className="search-button"
                        >
                            <FaRocket/>
                            Launch Search
                        </button>
                    }*/}
                </div>
            </div>
            <div className="chats-container">
                {chatRoomsIds === null?
                    <div>You do not have any contacts.</div> :
                    chatRoomsIds.map((roomId) => (
                        <div key={roomId}>
                            <ChatBar ChatRoomId={roomId} />
                        </div>
                    ))
                }
            </div>
        </div>)
    } else {
        return <div>You don't have an account.</div>
    }
}

export default DisplayAllChats;
