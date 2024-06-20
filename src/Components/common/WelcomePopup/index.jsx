import "./index.scss"
import welcome from "../../../assets/welcome.svg"
import {useNavigate} from "react-router-dom";

const WelcomePopup = () => {
    let navigate = useNavigate();

    return (<div className="welcome-overlay">
        <div className="welcome-popup">
            <div className="welcome-container">
                <img src={welcome}/>
                <div>Wait! Before getting started, we need you to create a profile.</div>
                <button className="continue-button"
                onClick={() => navigate("/profile")}>Continue</button>
            </div>
        </div>
    </div>)
}

export default WelcomePopup