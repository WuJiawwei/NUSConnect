import { 
    signOut,
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup 
} from "firebase/auth"
import { auth } from "../firebaseConfig"

export const LoginAPI = (email, password) => {
    try {
        let response = signInWithEmailAndPassword(auth, email, password)
        return response
    } catch (error) {
        return err
    }
};

export const RegisterAPI = (email, password) => {
    try {
        let response = createUserWithEmailAndPassword(auth, email, password)
        return response
    } catch (error) {
        return err
    }
};

export const GoogleSignInAPI = () => {
    try {
        let googleProvider = new GoogleAuthProvider()
        let res = signInWithPopup(auth, googleProvider)
        return res
    } catch (error) {
        return err
    }
};

export const onLogout = () => {
    try {
        signOut(auth)
    } catch (err) {
        return err
    }
}