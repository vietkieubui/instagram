import firebase from "firebase";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { getDocument } from "../../firebase/services";
import { USER_STATE_CHANGE } from "../constants";

export async function fetchUser() {
  return (dispatch) => {
    const docSnap = await getDoc(doc(db,'users',auth.currentUser.uid));
    if(docSnap.exists()){
      dispatch({type: USER_STATE_CHANGE, currentUser: docSnap.data()})
    }else{
      console.log("does not exist");
    }
  };
}
