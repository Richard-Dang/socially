import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Context as FriendContext } from "../context/FriendContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as SocialAccountContext } from "../context/SocialAccountContext";
import { Avatar, Text, Icon, Button } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";
import { SafeAreaView } from "react-navigation";
import GlobalStyles from "../styles/GlobalStyles";
import SocialAccount from "../components/SocialAccount";
import { NavigationEvents } from "react-navigation";

const FriendDetailScreen = ({ navigation }) => {
  const { state: friends, removeFriend } = useContext(FriendContext);
  const {
    state: { currentUser },
  } = useContext(AuthContext);
  const {
    state: { socialAccounts },
    fetchSocialAccounts,
    // clearSocialAccounts,
  } = useContext(SocialAccountContext);

  // If _id is null then show current user profile
  const _id = navigation.getParam("_id");
  const user = _id ? friends.find((f) => f._id === _id) : currentUser;

  // If ternary not used, user will be null and app will error (how do prevent render using stale data?)
  return !user ? null : (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <NavigationEvents
        onWillFocus={() => fetchSocialAccounts({ userId: user._id })}
        // TODO: onWillBlur currently not working for some reason
        // onWillBlur={clearSocialAccounts}
      />
      {_id ? (
        <Icon
          containerStyle={GlobalStyles.backButton}
          name="back"
          type="antdesign"
          onPress={() => navigation.navigate("FriendList")}
        />
      ) : (
        <Text h2>Profile</Text>
      )}

      <View style={styles.centerContainer}>
        <Avatar
          rounded
          size={200}
          source={{ uri: getAvatarUrl(user.email) }}
          containerStyle={styles.profileImage}
        />
        <Text h3 style={styles.name}>
          {user.name}
        </Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <View style={styles.accountsContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={socialAccounts.sort((a, b) =>
              a.accountType.localeCompare(b.accountType)
            )}
            keyExtractor={(item) => item._id}
            renderItem={({ item: socialAccount }) => {
              return (
                <SocialAccount
                  accountType={socialAccount.accountType}
                  username={socialAccount.username}
                />
              );
            }}
          />
        </View>
      </View>
      {_id ? (
        <View style={styles.removeFriendButtonContainer}>
          <Button
            title="Remove friend"
            onPress={() => {
              removeFriend(user._id, () => navigation.navigate("FriendList"));
            }}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

FriendDetailScreen.navigationOptions = () => {
  return {
    headerShown: false,
    tabBarIcon: <Icon name="person-outline" type="material" />,
  };
};

export default FriendDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    alignItems: "center",
  },
  profileImage: {
    // marginTop: 0
  },
  name: {
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 10,
  },
  bio: {
    marginBottom: 20,
    fontSize: 22,
  },
  removeFriendButtonContainer: {
    position: "absolute",
    bottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  accountsContainer: {
    // TODO: Want to use % and flex box to support at screen sizes
    height: 300,
  },
});
