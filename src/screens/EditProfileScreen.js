import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const EditProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <View>
      <Text>EditProfileScreen</Text>
      <Button title="Log out" onPress={logout} />
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({});
