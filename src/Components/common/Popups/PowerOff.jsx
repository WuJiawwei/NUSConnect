import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import DeleteMyAccount from "./deleteMyAccount.jsx";

const PowerOff = ({onClose}) => {

    const [isDeleteMyAccountOpen, setIsDeleteMyAccountOpen] = useState(false);
    const navigate = useNavigate();

    return (<div className="overlay">
        <div className="popup">
            <button className="close-button" onClick={onClose}>X</button>
            <div>
                What do you want to do?
                <div className="welcome-container">
                    <button className="select-choice-button">Logout</button>
                    <button
                        className="select-choice-button"
                        onClick={() => setIsDeleteMyAccountOpen(!isDeleteMyAccountOpen)}
                    >Delete my account</button>
                </div>
            </div>
            {isDeleteMyAccountOpen?
                <DeleteMyAccount isOpen={() => setIsDeleteMyAccountOpen(!isDeleteMyAccountOpen)}/> :
                <div></div>}
        </div>
    </div>)
}

export default PowerOff