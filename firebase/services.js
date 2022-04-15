import firebase, { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

export const addDocument = (collections, data) => {
  const usersCollectionRef = collection(db, collections);
  console.log("refffffffff: ", usersCollectionRef);
  console.log("dataaaaaaaaa: ", data);
  console.log("collectionsssssss: ", collections);
  addDoc(usersCollectionRef, {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  console.log("ghi done");
};
