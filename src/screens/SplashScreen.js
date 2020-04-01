import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-elements";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text h2 style={styles.appName}>
        Socially
      </Text>
      <View style={styles.buttonLayout}>
        <Button title="Log in" onPress={() => navigation.navigate("Login")} />
        <Button
          title="Register"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

SplashScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    borderColor: "red",
    borderWidth: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  appName: { marginBottom: 200 },
  buttonLayout: {
    backgroundColor: "white",
    flexDirection: "row",
    position: "absolute",
    bottom: 5
  }
});
