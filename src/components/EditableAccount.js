import React from "react";
import { StyleSheet, View } from "react-native";
import { Input, SocialIcon } from "react-native-elements";

const EditableAccount = ({ accountType, username }) => {
  return (
    <View style={styles.container}>
      <SocialIcon
        iconSize={16}
        type={accountType}
        raised={false}
        style={styles.icon}
      />
      <Input placeholder={username} inputContainerStyle={styles.inputBox} />
    </View>
  );
};

export default EditableAccount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 5
  },
  icon: {
    marginLeft: 50
  },
  inputBox: {
    margin: 0,
    width: "50%"
  }
});
