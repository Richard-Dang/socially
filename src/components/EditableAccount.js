import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, SocialIcon } from "react-native-elements";

const EditableAccount = ({ account, updateSocialAccountsLocally }) => {
  const [username, setUsername] = useState(account.username);

  return (
    <View style={styles.container}>
      <SocialIcon
        iconSize={16}
        type={account.accountType}
        raised={false}
        style={styles.icon}
      />
      <Input
        inputContainerStyle={styles.inputBox}
        // TODO: Create onPress handler to remove social media account
        rightIcon={{ type: "material", name: "cancel" }}
        value={username}
        onChangeText={newUsername => {
          setUsername(newUsername);
          const updatedAccount = account;
          updatedAccount.username = newUsername;
          updateSocialAccountsLocally(updatedAccount);
        }}
      />
    </View>
  );
};

export default EditableAccount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
    // borderColor: "red",
    // borderWidth: 5
  },
  icon: {
    marginLeft: 50
  },
  inputBox: {
    margin: 0,
    width: "60%"
  }
});
