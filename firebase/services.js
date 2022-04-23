import firebase, { db, auth } from "./config";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  where,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

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
  await setDoc(postRef, {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const addFollowing = async (uid) => {
  const followingRef = doc(
    db,
    "following",
    auth.currentUser.uid,
    "userFollowing",
    uid
  );
  await setDoc(followingRef, {});
};
export const deleteFollowing = async (uid) => {
  const followingRef = doc(
    db,
    "following",
    auth.currentUser.uid,
    "userFollowing",
    uid
  );
  await deleteDoc(followingRef);
};

export const setDocument = (collections, data, uid) => {
  setDoc(doc(db, collections, uid), {
    ...data,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const fetchUsersList = (search) => {
  const [documents, setDocuments] = useState([]);
  useEffect(async () => {
    let usersCollectionRef = collection(db, "users");
    usersCollectionRef = query(
      usersCollectionRef,
      orderBy("createdAt", "desc")
    );
    usersCollectionRef = query(usersCollectionRef, where("name", "==", search));
    const unsubcribe = onSnapshot(usersCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(data);
    });
    return unsubcribe;
  }, [search]);
  return documents;
};

export const logOut = () => {
  auth.signOut();
};

export const getComments = (uid, postId) => {
  const [comments, setComments] = useState([]);
  const commentsCollectionRef = collection(
    db,
    `posts/${uid}/userPosts/${postId}/comments`
  );
  onSnapshot(commentsCollectionRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => {
      // const text = doc.data();
      const id = doc.id;
      return { id, ...doc.data() };
    });
    setComments(data);
  });
  return comments;
};
