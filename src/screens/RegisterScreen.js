import React, { useContext, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Icon, Input, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { Context as AuthContext } from "../context/AuthContext";
import GlobalStyles from "../styles/GlobalStyles";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useContext(AuthContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
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
      />
      <Input
        placeholder="Username"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />
      <Input
        placeholder="Full Name"
        autoCapitalize="none"
        autoCorrect={false}
        value={name}
        onChangeText={setName}
      />
      <Input
        placeholder="Password"
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* TODO: Add error messages for failed login and field validation */}
      <Button
        title="Sign up"
        onPress={() => register({ email, username, name, password })}
      />
    </SafeAreaView>
  );
};

RegisterScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

export default RegisterScreen;

const styles = StyleSheet.create({});
