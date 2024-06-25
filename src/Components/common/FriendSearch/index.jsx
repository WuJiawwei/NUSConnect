import "./index.scss"
import {FaRocket, FaSearch} from "react-icons/fa";
import {useMemo, useState} from "react";
import {collection, getDocs, getFirestore, limit, query, where} from "firebase/firestore";
import {firestore} from "../../../firebaseConfig.js";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import FriendProfileModal from "../FriendProfile/index.jsx";

const FriendSearch = () => {

    const [search, setSearch] = useState({})
    const [data, setData] = useState(null)
    const [currentUser, setCurrentUser] = useState([])
    const [selectedUserId, setSelectedUserId] = useState(null);

    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])

    const getSearch = (event) => {
        let { name, value } = event.target
        let input = { [name]: value }
        setSearch({...search, ...input})
    }

    const manageClick = async () => {
        return fetchData()
    }

    const fetchData = async () => {
        const lookFor = search["interest"].toLowerCase()
        const currUserId = currentUser?.userID;
        try {
            const dbInstance = getFirestore();
            const db = collection(dbInstance, "users")
            const q = query(db, where ("hobby", "==", lookFor))
            const qq = query(q, where ("wantsToBefriend", "==", true), limit(10))
            const querySnapshot = await getDocs(qq);
            const fetchedData = querySnapshot.docs.filter(doc => doc.id != currUserId).map(doc => ({ id: doc.id, ...doc.data() }));
            setData(fetchedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <div className="friend-search-container">
                <div className="friend-search-box">
                    <FaSearch className="friend-search-icon"/>
                    <input
                        className="interest-input"
                        placeholder="Interests"
                        name="interest"
                        onChange={getSearch}
                    />
                    <button
                        className="friend-search-button"
                        onClick={manageClick}
                    >
                        <FaRocket/>
                        Launch Search
                    </button>
                </div>
            </div>
            <div className="friend-search-results-container">
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div className="friend-result" key={item.id}>
                            <div className="friend-avatar"><img src={item.avatar} width={50}/></div>
                            <div className="friend-name">{item.name}</div>
                            <div className="interest">{item["hobby"]}</div>
                            <button
                                className="view-friend-profile-button"
                                onClick={() => setSelectedUserId(item.id)}
                            >
                                View Profile
                            </button>
                        </div>
                    ))
                ) : (
                    data &&
                    <p>Oh man, we couldn't find you a friend with the same interest.
                        Try searching for something else.
                    </p>
                )}
            </div>
            {selectedUserId && (
                <FriendProfileModal
                    userId={selectedUserId}
                    onClose={() => setSelectedUserId(null)}
                />
            )}
        </div>
    )
}

export default FriendSearch;