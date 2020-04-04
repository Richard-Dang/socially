import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, SocialIcon } from "react-native-elements";

const EditableAccount = ({ account, accountsState }) => {
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
        value={account.username}
        onChangeText={(newUsername) => {
          // TODO: this is a pretty disguisting way of updated state...
          const { accounts, setAccounts } = accountsState;
          account.username = newUsername;
          const updatedAccounts = accounts.map(a =>
            a._id === account._id ? account : a
          );
          setAccounts(updatedAccounts);
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
