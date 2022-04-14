import firebase, { db } from "./config";
import { collection, addDoc } from "firebase/firestore";

export const addDocumentWithoutAwait = (collections, data) => {
  const usersCollectionRef = collection(db, collections);
  console.log("refffffffff: ", usersCollectionRef);
  console.log("dataaaaaaaaa: ", data);
  console.log("collectionsssssss: ", collections);
  addDoc(usersCollectionRef, data);
  console.log("ghi done");
};

export const addDocument = async (collections, data) => {
  const usersCollectionRef = collection(db, collections);
  console.log("refffffffff: ", usersCollectionRef);
  console.log("dataaaaaaaaa: ", data);
  console.log("collectionsssssss: ", collections);
  await addDoc(usersCollectionRef, data);
  console.log("ghi done");
};
