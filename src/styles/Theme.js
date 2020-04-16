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
      height: hp("4.5%"),
    },
  },
  Text: {
    h2Style: {
      marginVertical: hp("2%"),
      marginLeft: wp("5%"),
      fontSize: hp("4%"),
    },
  },
  Input: {
    inputContainerStyle: {
      margin: wp("3%"),
    },
    errorStyle: {
      marginLeft: wp("5%"),
    },
  },
  Header: {
    backgroundColor: "white",
  },
};

export default theme;
