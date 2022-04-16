import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { getDocument } from "../../firebase/services";
import { USER_STATE_CHANGE } from "../constants";

export function fetchUser() {
  return async (dispatch) => {
    const docSnap = await getDoc(doc(db, "users", auth.currentUser.uid));
    // console.log(docSnap.data());
    if (docSnap.exists()) {
      // console.log(docSnap.data());
      dispatch({ type: USER_STATE_CHANGE, currentUser: docSnap.data() });
    } else {
      console.log("does not exist");
    }
  };
}
