import React, { useContext, useState } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import { Avatar, Button, Header, Icon, Text } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import EditableAccount from "../components/EditableAccount";
import EditableField from "../components/EditableField";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as SocialAccountContext } from "../context/SocialAccountContext";
import { getAvatarUrl } from "../helpers/gravatar";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EditProfileScreen = ({ navigation }) => {
  const {
    state: { currentUser },
    updateUser,
    logout,
  } = useContext(AuthContext);
  const {
    state: { socialAccounts, unusedAccountTypes },
    fetchSocialAccounts,
    updateSocialAccounts,
    editSocialAccount,
    removeSocialAccount,
    addSocialAccount,
  } = useContext(SocialAccountContext);
  const [name, setName] = useState(currentUser.name);
  const [bio, setBio] = useState(currentUser.bio);
  const [dropDownItem, setDropDownItem] = useState(null);

  const updateProfile = (callback) => {
    updateUser({ name, bio });
    updateSocialAccounts({ socialAccounts });
    if (callback) callback();
  };

  // TODO: Fix duplicate key warning
  const dropDownItems = unusedAccountTypes
    ? unusedAccountTypes.map((u) => {
        return {
          label: u.charAt(0).toUpperCase() + u.slice(1),
          value: u,
        };
      })
    : [];

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
        size={hp("13%")}
        source={{ uri: getAvatarUrl(currentUser.email) }}
        containerStyle={styles.profileImage}
      />

      <EditableField fieldName="Name" setField={setName} value={name} />
      {/* TODO: Properly align input fields */}
      <EditableField fieldName="Bio     " setField={setBio} value={bio} />
      <Text style={styles.accountLabel}>Accounts</Text>
      <View style={styles.accountsListContainer}>
        {socialAccounts.length === 0 ? null : (
          <FlatList
            scrollEnabled
            showsVerticalScrollIndicator={false}
            data={socialAccounts}
            keyExtractor={(item) => item._id}
            renderItem={({ item: socialAccount }) => {
              return (
                <EditableAccount
                  socialAccount={socialAccount}
                  modifers={{ editSocialAccount, removeSocialAccount }}
                />
              );
            }}
          />
        )}
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            Icon={() => (
              <Icon name="plus" type="entypo" iconStyle={styles.addIcon} />
            )}
            style={dropdownStyle}
            placeholder={{
              label: "Add account",
              value: null,
            }}
            value={dropDownItem}
            onValueChange={(value) => {
              setDropDownItem(value);
            }}
            onDonePress={() => {
              addSocialAccount({
                accountType: dropDownItem,
                userId: currentUser._id,
              });
              setDropDownItem(null);
            }}
            items={dropDownItems}
            doneText="Add"
          />
        </View>
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
    marginTop: hp("1%"),
    marginBottom: hp("1%"),
    fontSize: wp("4%"),
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImage: {
    alignSelf: "center",
    marginTop: hp("2%"),
    marginBottom: hp("3%"),
  },
  accountLabel: {
    fontSize: wp("4%"),
    marginLeft: wp("10%"),
    marginBottom: hp("2%"),
  },
  logoutButtonContainer: {
    position: "absolute",
    bottom: hp("2%"),
    alignSelf: "center",
    width: wp("90%"),
  },
  headerText: {
    fontSize: wp("4%"),
  },
  dropdownContainer: {
    // marginRight: wp("5%"),
    marginLeft: wp("24%"),
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: wp("60%"),
  },
  addIcon: { marginTop: hp("1%") },
  accountsListContainer: {
    height: hp("30%"),
    marginLeft: wp("5%"),
  },
});
