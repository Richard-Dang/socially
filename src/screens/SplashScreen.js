import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import { Button, Text, Icon } from "react-native-elements";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/splash.jpg")}
        style={styles.image}
      >
        <View style={styles.appNameContainer}>
          <Icon
            name="social-myspace"
            type="foundation"
            size={50}
            iconStyle={styles.iconStyle}
          />
          <Text h2 style={styles.appName}>
            Socially
          </Text>
        </View>
        <View style={styles.buttonLayout}>
          <View style={styles.buttonContainer}>
            <Button
              title="Log in"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Register"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </View>
      </ImageBackground>
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
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1
  },
  appName: { fontWeight: "500" },
  buttonLayout: {
    // borderColor: "red",
    // borderWidth: 5,
    backgroundColor: "white",
    flexDirection: "row",
    position: "absolute",
    bottom: 0
  },
  buttonContainer: {
    flex: 1,
    marginBottom: 20
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center"
  },
  appNameContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 300
  },
  iconStyle: {
    marginTop: 30
  }
});
