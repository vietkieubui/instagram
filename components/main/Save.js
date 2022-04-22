import React, { useState } from "react";
import { View, TextInput, Image, Button } from "react-native";
import { storage, auth } from "./../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addPost } from "../../firebase/services";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
} from "../../reudx/actions";
require("firebase/firestore");
require("firebase/storage");

function Save(props) {
  const [caption, setCaption] = useState("");
  const uploadImage = async () => {
    const childPath = `posts/${auth.currentUser.uid}/${Math.random().toString(
      36
    )}`;
    console.log(props);
    const uri = props.route.params.image;
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, childPath);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          savePostData(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  const savePostData = (downloadURL) => {
    addPost({ downloadURL, caption });
    props.fetchUserPosts();
    props.navigation.popToTop();
  };
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: props.route.params.image }} />
      <TextInput
        placeholder="Write somethings...."
        onChangeText={(text) => setCaption(text)}
      />
      <Button title="Save" onPress={() => uploadImage()} />
    </View>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing },
    dispatch
  );

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
});
export default connect(mapStateToProps, mapDispatchToProps)(Save);
