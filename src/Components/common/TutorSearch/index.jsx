import "./index.scss"
import {FaRocket, FaSearch} from 'react-icons/fa'
import {useState} from "react";
import {collection, query, where, getDocs, limit} from "firebase/firestore";
import {firestore} from "../../../firebaseConfig.js";

const TutorSearchBar = () => {

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
        const lookFor = search["moduleCode"].toLowerCase()
        try {
            const db = collection(firestore, "users")
            const q = query(db, where ("Module Code", "==", lookFor))
            const qq = query(q, where ("wantsToTutor", "==", true), limit(10))
            const querySnapshot = await getDocs(qq);
            const fetchedData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setData(fetchedData); // Set state with fetched data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
        <div className="tutor-search-container">
        <div className="tutor-search-box">
            <FaSearch className="tutor-search-icon"/>
            <input
                className="module-input"
                placeholder="Module Code"
                name="moduleCode"
                onChange={getSearch}
            />
            <button
                className="tutor-search-button"
                onClick={manageClick}
            >
                <FaRocket/>
                Launch Search
            </button>
        </div>
        </div>
            <div>
                {data && data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id} >
                            <div>{item.name}</div>
                            <div>Module Code: {item["Module Code"]}</div>
                        </div>
                    ))
                ) : (
                    data && <p>No tutors found for the specified module code.</p>
                )}
            </div>
        </div>
    )
}

export default TutorSearchBar;