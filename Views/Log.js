import React from "react";
import { Text, View, Dimensions } from "react-native";
import LogEntry from "../src/LogEntry";

const { width, height } = Dimensions.get("window");
const LogView = () => {
  return (
    <View
      style={{
        width: width,
        height: height,
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ECECEC",
        paddingTop: "15%",
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginBottom: '5%',
          }}
        >
          Recent Adventures
        </Text>
      </View>
      <LogEntry date="4/22/2023" time="1:09" location="Los Angeles, CA" plants_scanned="12"/>
      <LogEntry date="4/20/2023" time="4:20" location="San Jose, CA" plants_scanned="4"/>
      <LogEntry date="12/6/2022" time="0:36" location="Seattle, WA" plants_scanned="24"/>
    </View>
  );
};

export default LogView;
