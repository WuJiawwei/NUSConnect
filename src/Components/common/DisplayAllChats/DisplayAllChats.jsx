import ChatBar from "./ChatBar.jsx"
import "./index.scss"
import {FaRocket, FaSearch, FaTimes} from "react-icons/fa";
import Topbar from "../Topbar/index.jsx"
import {getFirestore, collection, doc, getDoc} from "firebase/firestore";
import {useEffect, useState} from "react";
import {UserData} from "../../../UserData.js"

const DisplayAllChats = () => {

    /*todo:
    *  functions: search contact, delete contact*/
    const db = getFirestore()
    const usersDbRef = collection(db, 'users')
    const [chatRoomsIds, setChatRoomsIds] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            let currUserId = UserData.userID;
            const docRef = doc(usersDbRef, currUserId);
            try {
                const actualDoc = await getDoc(docRef);
                if (actualDoc.exists()) {
                    setChatRoomsIds(actualDoc.data().chatRooms);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error getting document:", error);
            }
        };

        fetchData();
    }, []); // todo : add dependencies

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