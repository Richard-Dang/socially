import React, { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Button, Icon, Text, Avatar, Header } from "react-native-elements";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as SocialAccountContext } from "../context/SocialAccountContext";
import { getAvatarUrl } from "../helpers/gravatar";
import EditableField from "../components/EditableField";
import EditableAccount from "../components/EditableAccount";

const EditProfileScreen = () => {
  const {
    state: { currentUser },
    logout
  } = useContext(AuthContext);
  const { state: socialAccounts, fetchSocialAccounts } = useContext(
    SocialAccountContext
  );

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <NavigationEvents
        onWillFocus={() => fetchSocialAccounts({ userId: currentUser._id })}
      />
      <Text h2>Profile</Text>
      <Avatar
        rounded
        size="xlarge"
        source={{ uri: getAvatarUrl(currentUser.email) }}
        containerStyle={styles.profileImage}
      />
      <EditableField fieldName="Name" placeholder={currentUser.name} />
      {/* TODO: Properly align input fields */}
      <EditableField fieldName="Bio     " placeholder={currentUser.bio} />
      <Text style={styles.accountLabel}>Accounts</Text>

      <FlatList
        scrollEnabled={false}
        data={socialAccounts}
        keyExtractor={item => item._id}
        renderItem={({ item: socialAccount }) => {
          return (
            <EditableAccount
              accountType={socialAccount.accountType}
              username={socialAccount.username}
            />
          );
        }}
      />
      <View style={styles.logoutButtonContainer}>
        <Button title="Log out" onPress={logout} style={styles.logoutButton} />
      </View>
    </SafeAreaView>
  );
};

EditProfileScreen.navigationOptions = {
  tabBarIcon: <Icon name="person-outline" type="material" />
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
    // borderColor: "red",
    // borderWidth: 5
  },
  profileImage: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 30
  },
  accountLabel: {
    fontSize: 18,
    marginLeft: 30
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    width: "90%"
  }
});
