import ChatBar from "./ChatBar.jsx"
import {useState} from "react";
import "./index.scss"
import {FaRocket, FaSearch, FaTimes} from "react-icons/fa";
import Topbar from "../Topbar/index.jsx"
import {UserData} from "../../../UserData.js"

const DisplayAllChats = () => {
    const [onSearch, setOnSearch] = useState(false)
    const [search, setSearch] = useState("")
    const [filteredResults, setFilteredResults] = useState([])

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
                    {UserData.contacts.length === 0 ?
                        <div className="no-contacts-text">You do not have any contacts.</div> :
                        <div>{UserData.contacts.map(c => <div key={c}><ChatBar id={c}/></div>)}</div>
                    }
                </div>}
        </div>)
    } else {
        return <div>You don't have an account.</div>
    }
}

export default DisplayAllChats;
