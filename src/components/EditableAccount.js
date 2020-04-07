import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Input, SocialIcon, Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EditableAccount = ({ socialAccount, modifers }) => {
  const [username, setUsername] = useState(socialAccount.username);
  const { editSocialAccount, removeSocialAccount } = modifers;

  return (
    <View style={styles.container}>
      <SocialIcon
        iconSize={hp("2%")}
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
            <Icon type="entypo" name="cross" />
          </TouchableOpacity>
        }
        value={username}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={(newUsername) => {
          setUsername(newUsername);
          const updatedAccount = socialAccount;
          updatedAccount.username = newUsername;
          editSocialAccount({ updatedAccount });
        }}
      />
    </View>
  );
};

export default EditableAccount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: wp("10%"),
  },
  inputBox: {
    margin: 0,
    width: wp("60%"),
  },
});
