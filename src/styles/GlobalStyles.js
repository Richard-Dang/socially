import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    marginLeft: wp("5%"),
    marginTop: hp("3%"),
  },
  inputContainer: {
    borderWidth: wp("1%"),
    borderBottomWidth: wp("1%"),
    borderColor: "black",
    backgroundColor: "white",
    paddingLeft: wp("3%"),
    marginHorizontal: wp("4.5%"),
    marginVertical: hp("1%"),
  },
});
