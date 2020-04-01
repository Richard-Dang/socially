import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

const EditProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Text>EditProfileScreen</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
};

EditProfileScreen.navigationOptions = {
  tabBarIcon: <MaterialIcons name="person-outline" size={30} />
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
