import React from "react";
import acctdeletion from "../../../assets/acctdeletion.gif"
import {useState} from "react";
import {getFirestore, doc, deleteDoc, collection} from "firebase/firestore"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const DeleteMyAccount = ({isOpen, account}) => {

    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const {id, name } = account

    const handleClick = async () => {
        if (account !== null) {
            const db = getFirestore();
            const dbRef = collection(db, "users")
            if (input === name) {
                const userDoc = doc(dbRef, "users", id)
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