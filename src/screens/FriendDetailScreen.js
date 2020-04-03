import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Context as FriendContext } from "../context/FriendContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as SocialAccountContext } from "../context/SocialAccountContext";
import { Avatar, Text, Icon } from "react-native-elements";
import { getAvatarUrl } from "../helpers/gravatar";
import { SafeAreaView } from "react-navigation";
import GlobalStyles from "../styles/GlobalStyles";
import SocialAccount from "../components/SocialAccount";
import { NavigationEvents } from "react-navigation";

const FriendDetailScreen = ({ navigation }) => {
  const { state: friends } = useContext(FriendContext);
  const {
    state: { currentUser }
  } = useContext(AuthContext);
  const {
    state: socialAccounts,
    fetchSocialAccounts,
    clearSocialAccounts
  } = useContext(SocialAccountContext);

  const _id = navigation.getParam("_id");
  const user = _id ? friends.find(f => f._id === _id) : currentUser;

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <NavigationEvents
        onWillFocus={() => fetchSocialAccounts({ userId: user._id })}
        // TODO: onWillBlur currently not working for some reason
        onWillBlur={clearSocialAccounts}
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

      <View style={styles.container}>
        <Avatar
          rounded
          size={200}
          source={{ uri: getAvatarUrl(user.email) }}
          containerStyle={styles.profileImage}
        />
        <Text h2 style={styles.name}>
          {user.name}
        </Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <FlatList
          scrollEnabled={false}
          data={socialAccounts}
          keyExtractor={item => item._id}
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
    </SafeAreaView>
  );
};

FriendDetailScreen.navigationOptions = () => {
  return {
    headerShown: false,
    tabBarIcon: <Icon name="person-outline" type="material" />
  };
};

export default FriendDetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  profileImage: {
    marginTop: 20
  },
  name: {
    fontWeight: "500"
  },
  bio: {
    marginBottom: 20,
    fontSize: 22
  }
});
