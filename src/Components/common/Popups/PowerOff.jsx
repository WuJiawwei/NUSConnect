import React from "react";

const PowerOff = ({onClose}) => {

    return (<div className="overlay">
        <div className="popup">
            <button className="close-button" onClick={onClose}>X</button>
            <div>
                Are you sure you want to log out?
                <div className="welcome-container">
                    <button className="logout-button">Logout</button>
                </div>
            </div>
        </div>
    </div>)
}

export default PowerOff