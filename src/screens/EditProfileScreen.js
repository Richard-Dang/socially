import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, Icon } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-navigation";

const EditProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Profile</Text>
      <Button title="Log out" onPress={logout} />
    </SafeAreaView>
  );
};

EditProfileScreen.navigationOptions = {
  tabBarIcon: <Icon name="person-outline" type="material" />
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
