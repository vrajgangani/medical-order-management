import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyBBgUH_-fAgQk5Ynbs6AHvo3UQZHREza8w",
  authDomain: "medical-order-manage.firebaseapp.com",
  projectId: "medical-order-manage",
  storageBucket: "medical-order-manage.appspot.com",
  messagingSenderId: "711877956367",
  appId: "1:711877956367:web:eade745a2cff953d3ea47a",
  measurementId: "G-8MPH1SSN0T",
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const singinUserWithEmailAndPass = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((res) => res)
      .catch((err) =>
        alert("You have entered an invalid username or password", err)
      );

  const logoutUser = () => {
    signOut(firebaseAuth);
    setUser(null);
  };

  const handleCreateNewListing = async (
    medicinename,
    price,
    discription,
    manufacutreDate,
    expireDate,
    manufactureName,
    coverPic
  ) => {
    const imageRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverPic.name}`
    );
    const uploadResult = await uploadBytes(imageRef, coverPic);
    return await addDoc(collection(firestore, "medicine"), {
      medicinename,
      discription,
      price,
      manufacutreDate,
      expireDate,
      manufactureName,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  const listAllmedicines = () => {
    return getDocs(collection(firestore, "medicine"));
  };

  const getmedicineById = async (id) => {
    const docRef = doc(firestore, "medicine", id);
    const result = await getDoc(docRef);
    return result;
  };

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  const placeOrder = async (medicineId, qty) => {
    const collectionRef = collection(
      firestore,
      "medicine",
      medicineId,
      "orders"
    );
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };

  const fetchMymedicines = async (userId) => {
    const collectionRef = collection(firestore, "medicine");
    const q = query(collectionRef, where("userID", "==", userId));

    const result = await getDocs(q);
    return result;
  };
  const getOrders = async (medicineId) => {
    const collectionRef = collection(
      firestore,
      "medicine",
      medicineId,
      "orders"
    );
    const result = await getDocs(collectionRef);
    return result;
  };

  const isLoggedIn = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        handleCreateNewListing,
        listAllmedicines,
        getImageURL,
        getmedicineById,
        placeOrder,
        fetchMymedicines,
        getOrders,
        isLoggedIn,
        user,
        logoutUser,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
