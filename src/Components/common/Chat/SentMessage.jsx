import {UserData} from "../../../UserData.js"
import "./index.scss"

const SentMessage = ({by, time, text}) => {
    if (by === UserData.userID) {
        return <div className="own-message">
            <div>{text}</div>
            <div className="own-avatar-and-date">
                <div>
                    <div className="own-date">{time}</div>
                </div>
                <div className="own-avatar">
                    <img src={UserData.avatar} width={40}/>
                </div>
            </div>
        </div>
    } else {
        return <div className="others-message">
            <div>{text}</div>
            <div>{time}</div>
            <div>{by}</div>
        </div>
    }
}

export default SentMessage;