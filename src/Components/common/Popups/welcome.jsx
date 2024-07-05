import "./index.scss"
import welcome from "../../../assets/welcome.gif"
import {useNavigate} from "react-router-dom";

const WelcomePopup = () => {
    let navigate = useNavigate();

    return (<div className="overlay">
        <div className="popup">
            <div className="welcome-container">
                <img src={welcome} width={400}/>
                <button className="continue-button"
                onClick={() => navigate("/home")}>Join</button>
            </div>
        </div>
    </div>)
}

export default WelcomePopup
