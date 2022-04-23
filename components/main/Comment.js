import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TextInput, Button } from "react-native";
import { auth, db } from "../../firebase/config";
import { onSnapshot, collection, addDoc } from "firebase/firestore";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUsersData } from "../../reudx/actions";

function Comment(props) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState("");
  const [text, setText] = useState("");
  useEffect(() => {
    getComments();
  }, [props.route.params.postId, props.users]);
  function matchUserToComments(comments) {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].hasOwnProperty("user")) {
        continue;
      }
      const user = props.users.find((x) => x.uid === comments[i].creator);
      if (user == undefined) {
        props.fetchUsersData(comments[i].creator, false);
      } else {
        comments[i].user = user;
      }
    }
    setComments(comments);
  }

  const getComments = () => {
    if (props.route.params.postId !== postId) {
      const commentsCollectionRef = collection(
        db,
        `posts/${props.route.params.uid}/userPosts/${props.route.params.postId}/comments`
      );
      onSnapshot(commentsCollectionRef, (snapshot) => {
        let comments = snapshot.docs.map((doc) => {
          const id = doc.id;
          return { id, ...doc.data() };
        });
        matchUserToComments(comments);
      });
      setPostId(props.route.params.postId);
    } else {
      matchUserToComments(comments);
    }
  };

  const onCommentSend = () => {
    const commentsCollectionRef = collection(
      db,
      `posts/${props.route.params.uid}/userPosts/${props.route.params.postId}/comments`
    );
    addDoc(commentsCollectionRef, { creator: auth.currentUser.uid, text });
  };
  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => {
          return (
            <View>
              {item.user != undefined ? <Text>{item.user.name}</Text> : null}
              <Text>{item.text}</Text>
            </View>
          );
        }}
      />
      <View>
        <TextInput
          placeholder="Comment..."
          onChangeText={(text) => setText(text)}
        />
        <Button title="Comment" onPress={onCommentSend} />
      </View>
    </View>
  );
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ fetchUsersData }, dispatch);

const mapStateToProps = (store) => ({
  users: store.usersState.users,
  posts: store.userState.posts,
  currentUser: store.userState.currentUser,
});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
