import React from 'react';
import './index.scss';
import {useNavigate} from "react-router-dom";

const SearchPopup = () => {

    let navigate = useNavigate();
    return (
        <div className="overlay">
            <div className="popup">
                <button className="close-button" onClick={() => navigate("/home")}>X</button>
                <div>What do you want to search for?</div>
                <div className="container">
                    <button className="choice-button" onClick={() => navigate("/searchfriend")}>
                        I want to look for a friend</button>
                    <button className="choice-button" onClick={() => navigate("/searchtutor")}>
                        I want to look for a tutor</button>
                </div>
            </div>
        </div>
    );
};

export default SearchPopup;
