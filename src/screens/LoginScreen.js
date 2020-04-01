import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Input } from "react-native-elements";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      <Button title="Log in" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
