import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Icon
        reverse
        name="back"
        type="antdesign"
        onPress={() => navigation.navigate("Splash")}
      />
      <Text h2>Log In</Text>
      <Input
        label="Email"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Log in" onPress={() => login({ email, password })} />
    </SafeAreaView>
  );
};

LoginScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default LoginScreen;

const styles = StyleSheet.create({});
