import {UserData} from "../../../UserData.js"
import "./index.scss"

const SentMessage = ({by, time, text}) => {
    if (by === UserData.userID) {
        return <div className="own-message">
            <div>{text}</div>
            <div>{time}</div>
            <div>{by}</div>
        </div>
    } else {
    }
}

export default SentMessage;