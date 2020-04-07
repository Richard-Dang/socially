import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, Input, Icon } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const EditableField = ({ fieldName, setField, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldName}>{fieldName}</Text>
      <Input
        inputContainerStyle={styles.inputContainer}
        onChangeText={setField}
        value={value}
        inputStyle={styles.inputText}
      />
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
  inputText: {
    fontSize: wp("4%"),
    marginBottom: hp("-0.5%")
  },
  inputContainer: {
    marginTop: hp("-1.5%"),
    marginBottom: hp("2%"),
    width: wp("60%"),
  },
  fieldName: {
    fontSize: wp("4%"),
    marginLeft: wp("10%"),
  },
});
