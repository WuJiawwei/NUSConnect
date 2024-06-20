import "./index.scss"
import {FaRocket, FaSearch} from "react-icons/fa";

const FriendSearch = () => {
    return (<div className="friend-search-container">
    <div className="friend-search-box">
        <FaSearch className="friend-search-icon"/>
        <input
            className="interest-input"
            placeholder="Interest"
            style = {{textTransform: 'uppercase'}}
        />
        <button className="friend-search-button">
            <FaRocket/>
            Launch Search
        </button>
    </div>
</div>)
}

export default FriendSearch;