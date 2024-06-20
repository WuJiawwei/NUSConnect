import "./index.scss"
import {FaRocket, FaSearch} from 'react-icons/fa'

const TutorSearchBar = () => {
    return (<div className="tutor-search-container">
        <div className="tutor-search-box">
            <FaSearch className="tutor-search-icon"/>
            <input
                className="module-input"
                placeholder="Module Code"
                style = {{textTransform: 'uppercase'}}
            />
            <button className="tutor-search-button">
                <FaRocket/>
                Launch Search
            </button>
        </div>
    </div>)
}

export default TutorSearchBar;