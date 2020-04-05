import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Input, SocialIcon, Icon } from "react-native-elements";

const EditableAccount = ({ socialAccount, modifers }) => {
  const [username, setUsername] = useState(socialAccount.username);
  const { editSocialAccount, removeSocialAccount } = modifers;

  return (
    <View style={styles.container}>
      <SocialIcon
        iconSize={16}
        type={socialAccount.accountType}
        raised={false}
        style={styles.icon}
      />
      <Input
        inputContainerStyle={styles.inputBox}
        rightIcon={
          <TouchableOpacity
            onPress={() => {
              removeSocialAccount({ socialAccount });
            }}
          >
            <Icon type="material" name="cancel" />
          </TouchableOpacity>
        }
        value={username}
        onChangeText={newUsername => {
          setUsername(newUsername);
          const updatedAccount = socialAccount;
          updatedAccount.username = newUsername;
          editSocialAccount({ updatedAccount });
        }}
      />
      {/* TODO: Add dropdown for adding accounts */}
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
