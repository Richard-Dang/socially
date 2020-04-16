import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import GlobalStyles from "../styles/GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { NavigationEvents } from "react-navigation";
import { validate } from "../helpers/validate";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const {
    state: { errorMessage },
    register,
    clearErrorMessage,
    addErrorMessage,
  } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <Icon
        containerStyle={GlobalStyles.backButton}
        name="back"
        type="antdesign"
        onPress={() => navigation.navigate("Splash")}
      />

      <Text h2>Register</Text>
      <Input
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        inputContainerStyle={GlobalStyles.inputContainer}
        onBlur={() => {
          setEmailError(validate("email", email));
        }}
        errorMessage={emailError}
      />
      <Input
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
        inputContainerStyle={GlobalStyles.inputContainer}
        onBlur={() => {
          setUsernameError(validate("username", username));
        }}
        errorMessage={usernameError}
      />
      <Input
        placeholder="Full Name"
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={setName}
        inputContainerStyle={GlobalStyles.inputContainer}
        onBlur={() => {
          setNameError(validate("name", name));
        }}
        errorMessage={nameError}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        inputContainerStyle={GlobalStyles.inputContainer}
        onBlur={() => {
          setPasswordError(validate("password", password));
        }}
        errorMessage={passwordError}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button
        title="Sign up"
        onPress={() => {
          if (!usernameError && !passwordError && !nameError && !emailError) {
            register({ email, username, name, password });
          } else {
            addErrorMessage({ errorMessage: "Please verify fields" });
          }
        }}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  button: { margin: wp("4%") },
  error: { color: "red", marginLeft: wp("7%"), marginTop: hp("2%") },
});
