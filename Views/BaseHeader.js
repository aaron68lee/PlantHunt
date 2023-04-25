//BUILD UPON THIS TEMPLATE
import React from "react";
import { Text, View, Dimensions, Button } from "react-native";

const { width, height } = Dimensions.get("window");
//VERY HARDCODED ALIGNMENTS
const BaseHeader = (props) => {
  return (
    <View
      style={{
        width: width,
        paddingBottom: "-50%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "green",
        flex: 0.125,
        flexDirection: "row",
      }}
    >
      <View style={{ marginTop: "10%"}}>
        <Text
          style={{
            color: "white",
            fontSize: 24,
          }}
        >
          {" "}
          plant hunt 🌿
        </Text>
      </View>
    </View>
  );
};

export default BaseHeader;
