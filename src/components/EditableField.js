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
      />
    </View>
  );
};

export default EditableField;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
    // borderColor: "red",
    // borderWidth: 5
  },
  inputContainer: {
    marginTop: hp("-1%"),
    marginBottom: hp("2%"),
    width: wp("60%")
  },
  fieldName: {
    fontSize: wp("5%"),
    marginLeft: wp("10%"),
  }
});
