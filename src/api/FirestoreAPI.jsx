import firebase from "firebase/compat/app"
import { firestore } from "../firebaseConfig"
import {
  doc,
  updateDoc,
  addDoc,
  setDoc,
  deleteDoc,
  query,
  collection,
  onSnapshot,
  where, arrayUnion
} from "firebase/firestore"
import { toast } from "react-toastify"

let likeRef = collection(firestore, "likes")
let postsRef = collection(firestore, "posts")
let reminderRef = collection(firestore, "reminders")
let userRef = collection(firestore, "users")
let commentRef = collection(firestore, "comments")

export const postStatus = (obj) => {
    addDoc(postsRef, obj)
      .then(() => {
        toast.success("Added successfully")
      })
      .catch((err) => {
        console.log(err)
      })
}

export const getStatus = (setAllStatus) => {
  onSnapshot(postsRef, (res) => {
    setAllStatus(
      res.docs.map((docs) => {
        return { ...docs.data(), id: docs.id}
      })
    )
  })
}

export const postUserData = (obj) => {
  addDoc(userRef, obj)
    .then(() => {})
    .catch((err) => {
      console.log(err)
    })
}

// has many usages
export const getCurrentUser = (setCurrentUser) => {
  let currEmail = localStorage.getItem("userEmail");
  onSnapshot(userRef, (res) => {
    setCurrentUser(
      res.docs
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

export const saveComment = (postId, comment, time, CName) => {
  try {
    addDoc(commentRef, {
      postId,
      comment,
      time,
      CName
    })
  } catch (err) {
    console.log(err)
  }
}

export const fetchComments = (postId, setComments) => {
  try {
    let Q = query(commentRef, where ('postId', "==", postId))
    onSnapshot(Q, (res) => {
      const C = res.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        }
      })
      setComments(C)
    })
  } catch (err) {
    console.log(err)
  }
}  

export const updatePost = (id, status) => {
  let postToUpdate = doc(postsRef, id)
  try {
    updateDoc(postToUpdate, { status })
    toast.success("Post updated successfully")
  }
  catch(err) {
    console.log(err)
  }
}

export const deletePost = (id) => {
  let postToDelete = doc(postsRef, id)
  try {
    deleteDoc(postToDelete)
    toast.success("Post deleted successfully")
  }
  catch(err) {
    console.log(err)
  }
}

export const reminderStatus = (obj) => {
  addDoc(reminderRef, obj)
    .then(() => {
      toast.success("Added successfully")
    })
    .catch((err) => {
      console.log(err)
    })
}

export const getReminderStatus = (setAllStatus) => {
onSnapshot(reminderRef, (res) => {
  setAllStatus(
    res.docs.map((docs) => {
      return { ...docs.data(), id: docs.id}
    })
  )
})
}

export const deleteReminder = (id) => {
  let reminderToDelete = doc(reminderRef, id)
  try {
    deleteDoc(reminderToDelete)
    toast.success("Reminder deleted successfully")
  }
  catch(err) {
    console.log(err)
  }
}