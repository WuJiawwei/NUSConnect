import "./index.scss";
import { FaRocket, FaSearch } from "react-icons/fa";
import {useEffect, useState} from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig.js";
import {UserData} from "../../../UserData.js"
import TutorProfileModal from "../Popups/TutorProfile.jsx";

const TutorSearch = () => {
    const [search, setSearch] = useState('');
    const [doc, setDoc] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

    useEffect(() => {
        console.log("This function has run.")
    }, [])

    const onClick = async () => {
        try {
            const lookFor = search.replace(/-/g, '').replace(/ /g, '').toUpperCase();
            const remove = UserData.userID;
            const db = collection(firestore, "users");
            const q1 = query(db, where("wantsToTutor", "==", true))
            const q2 = query(q1, where("Module Code", "==", lookFor), limit(10))
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
                    placeholder="Module Code"
                    onChange={e => setSearch(e.target.value)}
                />
                <button className="search-button" onClick = {onClick}>
                    <FaRocket/>
                    Launch Search
                </button>
            </div>
        </div>
        <div className="tutor-search-results-container">

            {doc.length !== 0 ?
                doc.map((doc) => (
                    <div className="tutor-result" key={doc.id}>
                        <div className="tutor-avatar">
                            <img src={doc.avatar} width={50} alt="Tutor Avatar"/>
                        </div>
                        <div className="tutor-name">{doc.name}</div>
                        <div className="module-code">{doc["Module Code"]}</div>
                        <button
                            className="view-tutor-profile-button"
                            onClick={() => setSelectedUserId(doc.id)}
                        >
                            View Profile
                        </button>
                    </div>
                )) : <div>No tutors found for the specified module code.</div>}

            {selectedUserId !== null ?
                <TutorProfileModal
                userId={selectedUserId}
                onClose={() => setSelectedUserId(null)}
                /> : <div></div>}
        </div>
    </div>)
}


export default TutorSearch;
