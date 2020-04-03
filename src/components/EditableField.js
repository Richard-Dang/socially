import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Icon } from "react-native-elements";

const EditableField = ({ fieldName, placeholder }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <Input placeholder={placeholder} inputContainerStyle={styles.inputBox} />
    </View>
  );
};

export default EditableField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // borderColor: "red",
    // borderWidth: 5
  },
  inputBox: {
    margin: 0,
    width: "60%"
  },
  fieldName: {
    fontSize: 18,
    marginLeft: 30,
  }
});
