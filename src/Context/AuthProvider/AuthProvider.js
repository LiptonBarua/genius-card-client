import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth"
import app from '../../Firebase/firebase.init';

export const AuthContext = createContext();

const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] =useState(null);
    const [loading, setLoading] = useState(true)

    const createUser=(email, password)=>{
      setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    
    const logIn =(email, password)=>{
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    }


    useEffect(()=>{
      const unsubcribe = onAuthStateChanged(auth, currentUser=>{
        setUser(currentUser)
        setLoading(false);
      })
      return ()=>{
        unsubcribe()
      }
    });

    
    const authInfo = {
      user,
      loading, 
      createUser, 
      logIn
    }
    return (
      <AuthContext.Provider value={authInfo}>
           {children}
      </AuthContext.Provider>
    );
};

export default AuthProvider;