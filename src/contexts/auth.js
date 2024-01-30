import { useState, useEffect, createContext } from 'react';
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth, db } from '../services/firebaseConnect';

export const AuthContext = createContext({});

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [countBook, setCountBook] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem("@ticketAcesso");

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }
        loadUser();
    }, [])

    async function signIn(email, password){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                name: docSnap.data().nome,
                avatarUrl: docSnap.data().avatarUrl,
                email: value.user.email
            }

            setUser(data);
            navigate("/ambiente");
            setLoadingAuth(false);
            storageUser(data);
            toast.success("Bem vindo(a) ao seu ambiente de leitura!");

        })
        .catch((err) => {
            console.log(err);
            setLoadingAuth(false);
            toast.error("Algo deu errado");
        })
    }

    async function signInWithGoogle(){
        const provider = new GoogleAuthProvider();

        setLoadingAuth(true);

        await signInWithPopup(auth, provider)
        .then(async(result) => {
            //console.log(result);

            const {displayName, photoURL, uid, email, count} = result.user;

            if(!email || !displayName){
                throw new Error('Erro ao buscar usuário')
            }

            await setDoc(doc(db, "users", uid), {
                name: displayName,
                avatarUrl: photoURL,
                email: email,
                count: countBook
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: displayName,
                    avatarUrl: photoURL,
                    email: email,
                    count: countBook
                }

                //console.log(email, uid, displayName, photoURL, count);
                setUser(data);
                navigate("/ambiente");
                setLoadingAuth(false);
                storageUser(data);
                toast.success("Bem vindo(a) ao seu ambiente de leitura!")
            })
        })
        .catch((err) => {
            console.log(err);
            setLoadingAuth(false);
            toast.error("Algo deu errado")
        })
    }

    async function signUp(email, password, nome){
        //console.log(nome, email, password);

        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;

            await setDoc(doc(db, "users", uid), {
                name: nome,
                avatarUrl: null,
                email: email,
                count: countBook
            })
            .then(() => {
                let data = {
                    uid: uid,
                    name: nome,
                    email: value.user.email,
                    avatarUrl: null,
                    count: countBook
                };

                setUser(data);
                setLoadingAuth(false);
                navigate("/ambiente");
                storageUser(data);
                toast.success("Bem vindo(a) ao seu ambiente de leitura!")
            })
        })
        .catch((err) => {
            console.log(err);
            setLoadingAuth(false);
            toast.error("Algo deu errado");
        })
    }

    async function logOut(){
        await signOut(auth);
        localStorage.removeItem("@ticketAcesso");
        setUser(false);
    }

    function storageUser(data){
        localStorage.setItem("@ticketAcesso", JSON.stringify(data))
    }

    
    
    return(
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            loadingAuth,
            loading,
            signInWithGoogle,
            logOut,
            setUser,
            countBook,
            setCountBook,
            storageUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}