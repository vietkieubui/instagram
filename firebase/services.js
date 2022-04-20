import firebase, { db, auth } from "./config";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";

export const addDocument = (collections, data) => {
  const usersCollectionRef = collection(db, collections);
  addDoc(usersCollectionRef, {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const addPost = async (data) => {
  const postRef = doc(
    db,
    "posts",
    auth.currentUser.uid,
    "userPosts",
    Math.random().toString(36)
  );
  setDoc(postRef, {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const setDocument = (collections, data, uid) => {
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
