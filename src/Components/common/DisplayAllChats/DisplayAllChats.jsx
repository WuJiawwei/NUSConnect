import Topbar from "../Topbar/index.jsx"
import ChatBar from "./ChatBar.jsx"
import {useState} from "react";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import "./index.scss"
import {FaRocket, FaSearch, FaTimes} from "react-icons/fa";
import {doc, getDoc, getFirestore} from "firebase/firestore";

const DisplayAllChats = ({currUserId}) => {
    const [onSearch, setOnSearch] = useState(false)
    const [search, setSearch] = useState("")
    const [filteredResults, setFilteredResults] = useState([])
    const [currUser, setCurrUser] = useState(null);
    getCurrentUser(setCurrUser) // todo : think about a way to not call this method

    const setSearchAfterProcessing = e => {
        const rawVal = e.target.value;
        const processedVal = rawVal.toUpperCase();
        setSearch(processedVal);
    }

    const launchSearch = async () => {
        console.log(currUser.filter(startsWithSearchWord))
        setFilteredResults(currUser.filter(startsWithSearchWord))
        setOnSearch(true)
    }

    const startsWithSearchWord = async (d) => {
        try {
            const db = getFirestore();
            const docRef = doc(db, "users", d)
            const actualDoc = await getDoc(docRef);
            if (actualDoc.exists()) {
                console.log(actualDoc.data().name)
                console.log( actualDoc.data().name.startsWith(search))
                // seems to work fine but results not getting filtered
                // todo : debug
                return actualDoc.data().name.startsWith(search)
            }
        } catch (err) {
            console.error(err);
        }
    }

    const terminateSearch = () => {
        setOnSearch(false)
        setSearch("")
    }

    if (currUser !== null) {
        return (<div>
            <div className="search-container">
                <div className="search-box">
                    <FaSearch className="search-icon"/>
                    <input
                        className="input"
                        placeholder="Search your contacts"
                        onChange={setSearchAfterProcessing}
                    />
                    {onSearch ?
                        <button
                            className="terminate-search-button"
                            onClick={terminateSearch}
                        >
                            <FaTimes/>
                            Terminate search
                        </button>
                        :
                        <button
                            className="search-button"
                            onClick={launchSearch}
                        >
                            <FaRocket/>
                            Launch Search
                        </button>
                    }
                </div>
            </div>
            {onSearch ?
                <div className="chats-container">
                    {filteredResults.length === 0 ?
                        <div className="no-contacts-text">No such contact found.</div>
                        : <div>{filteredResults.map(c => <div key={c}><ChatBar id={c}/></div>)}</div>
                    }
                </div> :
                <div className="chats-container">
                    {currUser.contacts.length === 0 ?
                        <div className="no-contacts-text">You do not have any contacts.</div> :
                        <div>{currUser.contacts
                            .map(c => <div key={c}><ChatBar id={c}/></div>)}</div>}
                </div>}
        </div>)
    } else {
        return <div>You don't have an account</div>
    }
}

export default DisplayAllChats;
