import React from "react";
import { StyleSheet, View, ImageBackground, Image } from "react-native";
import { Button, Text, Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/splash.png")}
        style={styles.image}
      >
        <View style={styles.appNameContainer}>
          <Image
            source={require("../../assets/title.png")}
            style={styles.appName}
          />
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
    headerShown: false,
  };
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1,
  },
  appName: { flex: 1, resizeMode: "contain", margin: wp("10%") },
  buttonLayout: {
    backgroundColor: "white",
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {
    flex: 1,
    marginTop: hp("1%"),
    marginBottom: hp("2%"),
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
    justifyContent: "center",
  },
  appNameContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: hp("40%"),
  },
});
