import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import { Gravatar, GravatarApi } from "react-native-gravatar";

const EditProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Profile</Text>
      <Gravatar
        options={{
          email: "richardspacedang@gmail.com", //TODO: hardcoded
          parameters: { size: "200", d: "mm" },
          secure: true
        }}
        style={styles.roundedProfileImage}
      />
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};

EditProfileScreen.navigationOptions = {
  tabBarIcon: <Icon name="person-outline" type="material" />
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  roundedProfileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  }
});
