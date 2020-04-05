import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import GlobalStyles from "../styles/GlobalStyles";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }} style={styles.container}>
      <Icon
        containerStyle={GlobalStyles.backButton}
        name="back"
        type="antdesign"
        onPress={() => navigation.navigate("Splash")}
      />
      <Text h2>Log In</Text>
      <Input
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        inputContainerStyle={GlobalStyles.inputContainer}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        inputContainerStyle={GlobalStyles.inputContainer}
      />
      {/* TODO: Add error messages for failed login and field validation */}
      <Button
        title="Log in"
        onPress={() => login({ email, password })}
        style={styles.button}
      />
    </SafeAreaView>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1
  },
  button: { margin: 15 }
});
