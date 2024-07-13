import React from "react";
import acctdeletion from "../../../assets/acctdeletion.gif"
import {useState} from "react";
import {getFirestore, doc, deleteDoc, collection} from "firebase/firestore"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {UserData} from "../../../UserData.js"

const DeleteMyAccount = ({isOpen}) => {

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const db = getFirestore();
    const dbRef = collection(db, "users")

    const handleClick = async () => {
        if (UserData !== null) {
            if (input === UserData.name) {
                const docRef = doc(dbRef, UserData.userID)
                await deleteDoc(docRef)
                navigate("/")
                toast.success("Account deleted successfully.")
            } else {
                toast.error("Account deletion failed.")
                navigate("/home")
            }
        } else {
            toast.error("You do not have an account!")
        }
    }

    if (UserData !== null) {
        return (<div className="overlay">
            <div className="popup">
                <button className="close-button" onClick={isOpen}>X</button>
                <div className="welcome-container">
                    <img src={acctdeletion} width={300}/>
                    <div>Please type in your username "{UserData.name}" to confirm deletion:</div>
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
    } else {
        return <div>You do not have an account.</div>
    }
}

export default DeleteMyAccount