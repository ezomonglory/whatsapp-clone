import '../styles/globals.css'
import { useAuthState } from "react-firebase-hooks/auth"
import {auth, db} from "../firebase"
import Login from "../components/Login"
import Loading from '../components/Loading'
import { collection, doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore' 
import { useEffect } from 'react'

function MyApp({ Component, pageProps }) {
    const [user, loading] = useAuthState(auth)    

    useEffect( ()=> {
        if(user){
            setDoc(doc(db, "users", user.uid), {
                email: user.email,
                lastSeen: serverTimestamp(),
                photoUrl: user.photoURL           
            }, {merge: true}) 
        }
    }, [user])
    

    if (loading) return <Loading />

    if (!user) return <Login />

  return <Component {...pageProps} />
}

export default MyApp
