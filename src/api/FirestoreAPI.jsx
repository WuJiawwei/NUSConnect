import firebase from "firebase/compat/app"
import { firestore } from "../firebaseConfig"
import { addDoc, collection, onSnapshot } from "firebase/firestore"
import { toast } from "react-toastify"

let postsRef = collection(firestore, "posts")
let userRef = collection(firestore, "users")

export const postStatus = (object) => {
    addDoc(postsRef, object)
      .then(() => {
        toast.success("Added successfully")
      })
      .catch((err) => {
        console.log(err)
      })
}

export const getStatus = (setAllStatus) => {
  onSnapshot(postsRef, (response) => {
    setAllStatus(
      response.docs.map((docs) => {
        return { ...docs.data(), id: docs.id}
      })
    )
  })
}

export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err)
    })
}

export const getCurrentUser = (setCurrentUser) => {
  let currEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (response) => {
    setCurrentUser(
      response.docs
        .map((docs) => {
          return { ...docs.data(), userID: docs.id}
        })
        .filter((item) => {
          return item.email.toLowerCase() === currEmail
        })[0]
    )
  })
};