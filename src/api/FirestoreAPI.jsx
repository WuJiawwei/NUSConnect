import firebase from "firebase/compat/app"
import { firestore } from "../firebaseConfig"
import { doc, 
         updateDoc, 
         addDoc, 
         setDoc,
         deleteDoc,
         query,
         collection, 
         onSnapshot,
         where
        } from "firebase/firestore"
import { toast } from "react-toastify"

let likeRef = collection(firestore, "likes")

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

export const editProfile = (userID, data) => {
  let userToEdit = doc(userRef, userID)

  updateDoc(userToEdit, data)
  .then(() => {
    toast.success("Profile updated successfully")
  })
    .catch((err) => {
      console.log(err)
    })
}

export const LikePost = (userId, postId, liked) => {
  try {
    let LikeDoc = doc(likeRef, `${userId}_${postId}`)
    if(liked) {
      deleteDoc(LikeDoc)
    } else {
      setDoc(LikeDoc, { userId, postId })
    }

  } catch (err) {
    console.log(err)
  } 
}

export const getLike = (userId, postId, setLiked, setLikeNum) => {
  try {
    let Q = query(likeRef, where('postId', '==', postId))
    onSnapshot(Q, (res) => {
      let likes = res.docs.map((doc) => doc.data())
      let likeNum = likes?.length

      const isLiked = likes.some((L) => L.userId === userId)

      setLikeNum(likeNum)
      setLiked(isLiked)
    })
  } catch (err) {
    console.log(err)
  } 
}