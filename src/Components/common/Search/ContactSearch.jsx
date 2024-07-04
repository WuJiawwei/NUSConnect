import "./index.scss"
import {FaRocket, FaSearch} from "react-icons/fa";

const ContactSearch = ({onSearch}) => {
    return (<div className="search-container">
        <div className="search-box">
            <FaSearch className="search-icon"/>
            <input
                className="input"
                placeholder="Search your contacts"
            />
            <button className="search-button">
                <FaRocket/>
                Launch Search
            </button>
        </div>
    </div>)
}

export default ContactSearch;