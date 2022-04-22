import { async } from "@firebase/util";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import {
  getDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  collection,
} from "firebase/firestore";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fetchUser,
  fetchUserPosts,
  fetchUserFollowing,
  reload,
} from "../../reudx/actions";
import { auth, db } from "../../firebase/config";
import { addFollowing, deleteFollowing, logOut } from "../../firebase/services";

function Profile(props) {
  // console.log(props);
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(async () => {
    const { currentUser, posts } = props;
    if (props.route.params.uid === auth.currentUser.uid) {
      setUser(currentUser);
      setUserPosts(posts);
    } else {
      const docSnap = await getDoc(doc(db, "users", props.route.params.uid));
      if (docSnap.exists()) {
        setUser(docSnap.data());
      } else {
        console.log("does not exist");
      }
      let userPostsRef = collection(
        db,
        `posts/${props.route.params.uid}/userPosts`
      );
      userPostsRef = query(userPostsRef, orderBy("createdAt", "desc"));
      onSnapshot(userPostsRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setUserPosts(data);
      });
    }
    if (props.following.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, props.following]);

  const onFollow = () => {
    addFollowing(props.route.params.uid);
  };
  const onUnfollow = () => {
    deleteFollowing(props.route.params.uid);
  };

  const onLogout = () => {
    logOut();
  };
  if (user === null) {
    return <View></View>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        {props.route.params.uid !== auth.currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Following" onPress={onUnfollow} />
            ) : (
              <Button title="Follow" onPress={onFollow} />
            )}
          </View>
        ) : (
          <Button title="Log out" onPress={onLogout} />
        )}
      </View>
      <View style={styles.containerGallery}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                props.reload();
              }}
            />
          }
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
  following: store.userState.following,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { fetchUser, fetchUserPosts, fetchUserFollowing, reload },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
