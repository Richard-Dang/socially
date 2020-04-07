import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const theme = {
  Button: {
    titleStyle: {
      textTransform: "uppercase",
    },
    buttonStyle: {
      backgroundColor: "black",
      margin: wp("3%"),
    },
  },
  Text: {
    h2Style: {
      marginVertical: hp("3%"),
      marginLeft: wp("5%"),
      fontSize: wp("10%"),
    },
  },
  Input: {
    inputContainerStyle: {
      margin: wp("3%"),
    },
  },
  Header: {
    backgroundColor: "white",
  },
};

export default theme;
