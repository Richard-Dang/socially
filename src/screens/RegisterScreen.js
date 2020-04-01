import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, Input } from "react-native-elements";
import { Context as AuthContext } from "../context/AuthContext";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  return (
    <View>
      <Text h2>Register</Text>
      <Input
        label="Email"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Input
        label="Username"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        label="Full Name"
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={setName}
      />
      <Input
        label="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign up"
        onPress={() => register({ email, username, name, password })}
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
