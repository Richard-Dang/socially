import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Avatar, Button, Header, Icon, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import EditableAccount from "../components/EditableAccount";
import EditableField from "../components/EditableField";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as SocialAccountContext } from "../context/SocialAccountContext";
import { getAvatarUrl } from "../helpers/gravatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";

const EditProfileScreen = ({ navigation }) => {
  const {
    state: { currentUser },
    updateUser,
    logout
  } = useContext(AuthContext);
  const {
    state: socialAccounts,
    fetchSocialAccounts,
    updateSocialAccounts,
    editSocialAccount,
    removeSocialAccount
  } = useContext(SocialAccountContext);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);

  const updateProfile = callback => {
    updateUser({ name, bio });
    updateSocialAccounts({ socialAccounts });
    if (callback) callback();
  };

  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={() => fetchSocialAccounts({ userId: currentUser._id })}
      />
      <Header
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FriendList");
              fetchSocialAccounts({ userId: currentUser._id });
            }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        }
        centerComponent={{ text: "Edit Profile", style: styles.headerText }}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              updateProfile(() => navigation.navigate("FriendList"));
            }}
          >
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

      <EditableField fieldName="Name" setField={setName} value={name} />
      {/* TODO: Properly align input fields */}
      <EditableField fieldName="Bio     " setField={setBio} value={bio} />
      <Text style={styles.accountLabel}>Accounts</Text>
      <View>
        <FlatList
          scrollEnabled={false}
          data={socialAccounts}
          keyExtractor={item => item._id}
          renderItem={({ item: socialAccount }) => {
            return (
              <EditableAccount
                socialAccount={socialAccount}
                modifers={{ editSocialAccount, removeSocialAccount }}
              />
            );
          }}
        />
      </View>

      <View style={styles.dropdownContainer}>
        {/* TODO: Implement adding account logic */}
        <RNPickerSelect
          Icon={() => {
            return (
              <Icon name="plus" type="entypo" iconStyle={styles.addIcon} />
            );
          }}
          style={dropdownStyle}
          placeholder={{
            label: "Add account",
            value: null
          }}
          onValueChange={value => console.log(value)}
          items={[
            { label: "Football", value: "football" },
            { label: "Baseball", value: "baseball" },
            { label: "Hockey", value: "hockey" }
          ]}
        />
      </View>

      <View style={styles.logoutButtonContainer}>
        <Button title="Log out" onPress={logout} />
      </View>
    </View>
  );
};

export default EditProfileScreen;

const dropdownStyle = StyleSheet.create({
  inputIOS: {
    marginTop: 15,
    marginBottom: 7,
    fontSize: 18
  }
});

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
    marginLeft: 30,
    marginTop: 20,
    marginBottom: 10
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
  },
  dropdownContainer: {
    marginRight: 10,
    marginLeft: 104,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "57%"
  },
  addIcon: { marginTop: 13 }
});
