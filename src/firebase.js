import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDBFUY701xYldJwtbGKElsaXOr40qXKpU0",
  authDomain: "netflix-clone-d2609.firebaseapp.com",
  projectId: "netflix-clone-d2609",
  storageBucket: "netflix-clone-d2609.appspot.com",
  messagingSenderId: "652094536042",
  appId: "1:652094536042:web:d05bda483bfd22fc3dcd13"
};

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db,"user"),{
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    })
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));

  }
}

const login = async(email,password)=>{ 
  try {
    await signInWithEmailAndPassword(auth,email,password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
  
}

const logout = ()=>{
  signOut(auth);
}
export {auth,db,login,signup,logout};