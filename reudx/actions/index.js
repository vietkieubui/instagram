import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { getDocument } from "../../firebase/services";
import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
  return async (dispatch) => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (docSnap.exists()) {
      dispatch({ type: USER_STATE_CHANGE, currentUser: docSnap.data() });
    } else {
      console.log("does not exist");
    }
  };
}

export function fetchUserPosts() {
  return async (dispatch) => {
    let userPostsRef = collection(
      db,
      `posts/${auth.currentUser.uid}/userPosts`
    );
    userPostsRef = query(userPostsRef, orderBy("createdAt"));
    onSnapshot(userPostsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("dataaaaa:", data);
      dispatch({ type: USER_POSTS_STATE_CHANGE, posts: data });
    });
  };
}
