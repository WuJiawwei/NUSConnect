import { firestore } from "../firebaseConfig"
import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify"

let dbRef = collection(firestore, "posts")
export const postStatus = (status) => {
    let obj = {
        status: status
    }
    addDoc(dbRef, obj)
      .then(() => {
        toast.success("Added successfully")
      })
      .catch((err) => {
        console.log(err)
      })
}