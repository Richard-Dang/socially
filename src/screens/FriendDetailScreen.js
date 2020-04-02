import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Context as FriendContext } from "../context/FriendContext";
import { Avatar } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";

const FriendDetailScreen = ({ navigation }) => {
  const {
    state: { friends, currentUser }
  } = useContext(FriendContext);
  const _id = navigation.getParam("_id");

  const user =
    _id === currentUser._id ? currentUser : friends.find(f => f._id === _id);

  return (
    <View>
      <Avatar
        rounded
        size={200}
        source={{ uri: getAvatarUrl(user.email) }}
        containerStyle={styles.profileImage}
      />
      <Text>{user.name}</Text>
    </View>
  );
};

export default FriendDetailScreen;

const styles = StyleSheet.create({
  profileImage: {
    alignSelf: "center",
    marginTop: 50
  }
});
