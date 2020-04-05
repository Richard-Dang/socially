import React, { useContext } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import FriendListItem from "../components/FriendListItem";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as FriendContext } from "../context/FriendContext";
import { getAvatarUrl } from "../helpers/gravatar";

const FriendListScreen = ({ navigation }) => {
  const { state: friends, fetchFriends } = useContext(FriendContext);
  const {
    state: { currentUser }
  } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <NavigationEvents onWillFocus={fetchFriends} />
      <View style={styles.headerContainer}>
        <Text h2>Friends</Text>
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <Avatar rounded source={{ uri: getAvatarUrl(currentUser.email) }} size={40} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={friends}
        keyExtractor={item => item._id}
        renderItem={({ item: friend }) => <FriendListItem friend={friend} />}
      />
    </SafeAreaView>
  );
};

FriendListScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default FriendListScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
    // borderColor: "red",
    // borderWidth: 5,
  },
  headerContainer: {
    flexDirection: "row"
  },
  profileContainer: {
    position: "absolute",
    top: 35,
    right: 30
  }
});
