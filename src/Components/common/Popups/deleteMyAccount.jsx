import React from "react";
import acctdeletion from "../../../assets/acctdeletion.gif"
import {useState} from "react";
import {getCurrentUser} from "../../../api/FirestoreAPI.jsx";
import {getFirestore, doc, deleteDoc} from "firebase/firestore"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const DeleteMyAccount = ({isOpen}) => {

    const [account, setAccount] = useState(null);
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    getCurrentUser(setAccount);

    const handleClick = async () => {
        if (account !== null) {
            const db = getFirestore();
            const id = account.userID
            const name = account.name
            if (input === name) {
                const userDoc = doc(db, "users", id)
                try {
                    await deleteDoc(userDoc)
                } catch (error) {
                    console.log(error)
                }
                toast.success("Account deletion successful.")
                navigate("/")
            } else {
                toast.error("Account deletion failed.");
                navigate("/home")
            }
        } else {
            console.log("No account found");
        }
    }

    if (account !== null) {
        const name = account.name;
        return (<div className="overlay">
            <div className="popup">
                <button className="close-button" onClick={isOpen}>X</button>
                <div className="welcome-container">
                    <img src={acctdeletion} width={300}/>
                    <div>Please type in your username "{name}" to confirm deletion:</div>
                    <input
                        className= "username-input"
                        placeholder={name}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="select-choice-button"
                        onClick={handleClick}
                    >Delete my account</button>
                </div>
            </div>
        </div>)
    }
}

export default DeleteMyAccount