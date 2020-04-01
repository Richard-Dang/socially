import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  return (
    <View>
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
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
