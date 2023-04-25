import React from "react";
import {
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import tailwind from "tailwind-rn";
import LogEntry from "../src/LogEntry";
import { useState } from "react";

const { width, height } = Dimensions.get("window");
const containers = {
  width: width,
  //height: height,
  justifyContent: "center",
  alignItems: "center",
};
const styles = StyleSheet.create({
  containers: {
    width: width,
    //height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    ...containers,
    justifyContent: "space-between",
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  leaderboard: {
    ...containers,
    flex: 2,
    backgroundColor: "green",
    borderRadius: 20,
    marginLeft: "10%",
    marginRight: "10%",
    justifyContent: "flex-start",
  },
  myCollectionHeader: { ...containers, flex: 0.5 },
  myCollection: {
    ...containers,
    flex: 4,
    backgroundColor: "green",
    justifyContent: "flex-start",
  },
});
const AdventureView = () => {
  return (
    <SafeAreaView>
      <View
        style={{
          width: width,
          height: height,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#ECECEC",
          flexDirection: "column",
        }}
      >
        <View style={styles.info}>
          <Text style={{ marginLeft: "5%" }}>
            Date and Time{"\n"}04/23/2023, 09:12:22
          </Text>
          <Text style={{ marginRight: "5%" }}>Group Code{"\n"}a0s2m</Text>
        </View>
        <View style={styles.leaderboard}>
          <Text style={{ margin: "5%" }}>Leaderboard</Text>
        </View>
        <View style={styles.myCollectionHeader}>
          <Text>My Collection</Text>
        </View>
        <View style={styles.myCollection}>
          <Text style={{ margin: "5%" }}>Insert Grid of Plants here</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdventureView;
