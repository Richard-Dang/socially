import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View
} from "react-native";
import { Text, Avatar } from "react-native-elements";
import { Context as FriendContext } from "../context/FriendContext";
import { ListItem } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { getAvatarUrl } from "../helpers/gravatar";

const currentUserProfile = (currentUser, navigation) => (
  <TouchableOpacity
    style={styles.profileContainer}
    onPress={() => {
      navigation.navigate("FriendDetail", { _id: currentUser._id });
    }}
  >
    <Avatar rounded source={{ uri: getAvatarUrl(currentUser.email) }} />
  </TouchableOpacity>
);

const FriendListScreen = ({ navigation }) => {
  const {
    state: { friends, currentUser },
    fetchFriends,
    fetchCurrentUser
  } = useContext(FriendContext);

  useEffect(() => {
    // TODO: Check for potential bug of current user not being updated after sign out
    fetchCurrentUser();
  }, []);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <NavigationEvents onWillFocus={fetchFriends} />
      <View style={styles.headerContainer}>
        <Text h2>Friends</Text>
        {/* TODO: Probably a better way of waiting for data before rendering*/}
        {currentUser ? currentUserProfile(currentUser, navigation) : null}
      </View>
      <FlatList
        data={friends}
        keyExtractor={item => item._id}
        renderItem={({ item: friend }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("FriendDetail", { _id: friend._id });
              }}
            >
              <ListItem
                chevron
                title={friend.name}
                subtitle={friend.bio ? friend.bio : null}
                leftAvatar={{ source: { uri: getAvatarUrl(friend.email) } }}
                bottomDivider
              />
            </TouchableOpacity>
          );
        }}
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
  headerContainer: {
    flexDirection: "row"
  },
  profileContainer: {
    position: "absolute",
    top: 20,
    right: 20
  }
});
