import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import {
  USER_POSTS_STATE_CHANGE,
  USER_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
} from "../constants";

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
    userPostsRef = query(userPostsRef, orderBy("createdAt", "desc"));
    onSnapshot(userPostsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch({ type: USER_POSTS_STATE_CHANGE, posts: data });
    });
  };
}
export function fetchUserFollowing() {
  return async (dispatch) => {
    let userPostsRef = collection(
      db,
      `following/${auth.currentUser.uid}/userFollowing`
    );
    onSnapshot(userPostsRef, (snapshot) => {
      const following = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following });
    });
  };
}
