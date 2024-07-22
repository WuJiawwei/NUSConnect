import {UserData} from "../../../UserData.js"
import "./index.scss"

const SentMessage = ({by, time, text}) => {
    if (by === UserData.userID) {
        return <div className="own-message">
            <div className="own-text">{text}</div>
            <div className="own-avatar-and-date">
                <div className="own-date">{time}</div>
                <div className="own-avatar">
                    <img src={UserData.avatar} width={40}/>
                </div>
            </div>
        </div>
    } else {
        return <div className="others-message">
            <div className="others-text">{text}</div>
            <div className="others-avatar-and-date">
                <div className="others-date">{time}</div>
                <div className="others-avatar">
                    <img src={UserData.toUserData.avatar} width={40}/>
                </div>
            </div>
        </div>
    }
}

export default SentMessage;