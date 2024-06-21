import "./index.scss"
import {FaRocket, FaSearch} from "react-icons/fa";
import {useState} from "react";
import {collection, getDocs, limit, query, where} from "firebase/firestore";
import {firestore} from "../../../firebaseConfig.js";

const FriendSearch = () => {

    const [search, setSearch] = useState({})
    const [data, setData] = useState(null)

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
        try {
            const db = collection(firestore, "users")
            const q = query(db, where ("hobby", "==", lookFor))
            const qq = query(q, where ("wantsToBefriend", "==", true), limit(10))
            const querySnapshot = await getDocs(qq);
            const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
                        <div className ="friend-result" key={item.id} >
                            <div className="friend-name">{item.name}</div>
                            <div className="interest">{item["hobby"]}</div>
                            <button className="view-friend-profile-button">View profile</button>
                        </div>
                    ))
                ) : (
                    data &&
                    <p>Oh man, we couldn't find you a friend with the same interest.
                        Try searching for something else.
                    </p>
                )}
            </div>
        </div>
    )
}

export default FriendSearch;