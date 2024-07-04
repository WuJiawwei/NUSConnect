import ContactSearchResults from "../Search/ContactSearchResults.jsx";
import Topbar from "../Topbar/index.jsx"
import ChatBar from "./ChatBar.jsx"
import ContactSearch from "../Search/ContactSearch.jsx";
import {useState} from "react";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import "./index.scss"

const DisplayAllChats = () => {
    const [currUser, setCurrUser] = useState(null)
    const [onSearch, setOnSearch] = useState(false)
    getCurrentUser(setCurrUser)
    if (currUser !== null) {
        return (<div>
            <Topbar/>
            <ContactSearch onSearch={setOnSearch}/>
            <div>
                {onSearch ? <ContactSearchResults/> :
                    <div className="chats-container">
                        {currUser.contacts.length === 0 ?
                        <div className="no-contacts-text">You do not have any contacts.</div> :
                        <div>{currUser.contacts
                            .map(c => <div key={c}><ChatBar id={c}/></div>)}</div>}
                    </div>}
            </div>
        </div>)
    } else {
        return <div>You don't have an account</div>
    }
}

export default DisplayAllChats;