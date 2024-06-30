import "./index.scss";
import { FaRocket, FaSearch } from "react-icons/fa";
import { useState} from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig.js";
import { getCurrentUser } from "../../../api/FirestoreAPI.jsx";
import FriendProfileModal from "../Popups/FriendProfile.jsx";

const FriendSearch = () => {
    const [search, setSearch] = useState('');
    const [doc, setDoc] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    getCurrentUser(setCurrentUser)
    const [selectedUserId, setSelectedUserId] = useState(null);
    const onClick = async () => {
        try {
            console.log(currentUser)
            const lookFor = search;
            const remove = currentUser.userID;
            const db = collection(firestore, "users");
            const q1 = query(db, where("wantsToBefriend", "==", true))
            const q2 = query(q1, where("hobby", "==", lookFor), limit(10))
            const querySnapshot = await getDocs(q2);
            const fetchedData = querySnapshot.docs
                .filter(doc => doc.id !== remove)
                .map((doc) => ({ id: doc.id, ...doc.data() }));
            setDoc(fetchedData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }
    return (<div>
        <div className="search-container">
            <div className="search-box">
                <FaSearch className="search-icon"/>
                <input
                    className="input"
                    placeholder="Interest(Search in all caps and in 1 word...)"
                    onChange={e => setSearch(e.target.value)}
                />
                <button className="search-button" onClick = {onClick}>
                    <FaRocket/>
                    Launch Search
                </button>
            </div>
        </div>
        <div className="friend-search-results-container">

            {doc.length !== 0 ?
                doc.map((doc) => (
                    <div className="friend-result" key={doc.id}>
                        <div className="friend-avatar">
                            <img src={doc.avatar} width={50} alt="Friend Avatar"/>
                        </div>
                        <div className="friend-name">{doc.name}</div>
                        <div className="interest">{doc.hobby}</div>
                        <button
                            className="view-friend-profile-button"
                            onClick={() => setSelectedUserId(doc.id)}
                        >
                            View Profile
                        </button>
                    </div>
                )) : <div>Oh man, maybe you should try searching with another interest :(</div>}

            {selectedUserId !== null ?
                <FriendProfileModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                /> : <div></div>}
        </div>
    </div>)
}


export default FriendSearch;