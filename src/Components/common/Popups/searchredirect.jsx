import React from 'react';
import './index.scss';
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SearchPopup = ({func, currUser}) => {

    const [isFriendSearch, setIsFriendSearch] = useState(false);
    let navigate = useNavigate();

    return (
        <div>
            <div className="overlay">
                <div className="popup">
                    <button className="close-button" onClick={func}>X</button>
                    <div>Who are you looking for?</div>
                    <div className="search-container">
                        <button
                            className="select-choice-button"
                            onClick={() => navigate("/searchfriend")}
                        >
                            A friend
                        </button>
                        <button
                            className="select-choice-button"
                            onClick={() => navigate("/searchtutor")}
                        >
                            A tutor
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default SearchPopup;
