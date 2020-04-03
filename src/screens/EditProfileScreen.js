import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Button, Header, Icon, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import EditableAccount from "../components/EditableAccount";
import EditableField from "../components/EditableField";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as SocialAccountContext } from "../context/SocialAccountContext";
import { getAvatarUrl } from "../helpers/gravatar";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditProfileScreen = ({ navigation }) => {
  const {
    state: { currentUser },
    logout
  } = useContext(AuthContext);
  const { state: socialAccounts, fetchSocialAccounts } = useContext(
    SocialAccountContext
  );

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => fetchSocialAccounts({ userId: currentUser._id })}
      />
      <Header
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate("FriendList")}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        }
        centerComponent={{ text: "Edit Profile", style: styles.headerText }}
        rightComponent={
          // TODO: Implement save profile action
          <TouchableOpacity onPress={() => {}}>
            <Text>Save</Text>
          </TouchableOpacity>
        }
      />
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
    </View>
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
    bottom: 30,
    alignSelf: "center",
    width: "90%"
  },
  headerText: {
    fontSize: 20,
    marginTop: 10
  }
});
