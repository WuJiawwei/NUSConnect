import React, {useState} from "react";

function createComponentWhenClicked(comp, str, comp2) {
    const [divVisible, setDivVisible] = useState(false);

    const toggleDiv = () => {
        setDivVisible(!divVisible); // Toggles the visibility
    };

    return (
        <div>
            <li onClick={toggleDiv} className="li">Yes</li>
            {divVisible && (
                <div id="myDiv">{str}
                    <div>{comp}</div>
                    <div>{comp2}</div>
                </div>
            )}
        </div>
    );
}

export default createComponentWhenClicked;