import firebase, { db } from "./config";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

export const addDocument = (collections, data) => {
  const usersCollectionRef = collection(db, collections);
  console.log("refffffffff: ", usersCollectionRef);
  console.log("dataaaaaaaaa: ", data);
  console.log("collectionsssssss: ", collections);
  addDoc(usersCollectionRef, {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  console.log("ghi addDoc done");
};

export const setDocument = (collections, data, uid) => {
  console.log("dataaaaaaaaa: ", data);
  console.log("collectionsssssss: ", collections);
  setDoc(doc(db, collections, uid), {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  console.log("ghi setDoc doneeee");
};

export const getDocument = async (collections, uid) => {
  const docRef = doc(db, collections, uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("getDocument:", docSnap.data());
    return docSnap.data();
  } else {
    console.log("No such document!");
    return undefined;
  }
};
