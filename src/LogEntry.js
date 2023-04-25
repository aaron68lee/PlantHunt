import React from "react";
import { Text, View } from "react-native";

const LogEntry = (props) => {
  return (
      <View
        style={{
          height: "20%",
          width: "80%",
          backgroundColor: "#236F21",
          // alignItems: 'center',
          // justifyContent: 'center',
          borderRadius: 15,
          display: "flex",
          marginBottom: '5%',
        }}
      >
        <View style={{
            left: '8%',
            top: '5%',
        }}>
          <Text style={{ 
            color: "white",
            fontWeight: "bold",
            fontSize: 24,
            }}>{props.date}</Text>
        </View>
        <View style={{
            left: '75%',
            top: '-12%',
        }}>
          <Text style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 24,
            }}>{props.time}</Text>
        </View>
        <View style={{
            left: '8%',
            top: '12%',
        }}>
          <Text style={{
            color: "white",
            fontSize: 18,
            }}>{props.location}</Text>
        </View>
        <View style={{
            left: '8%',
            top: '22%',
        }}>
          <Text style={{
            color: "white",
            fontSize: 18,
            }}>{props.plants_scanned} plants scanned</Text>
        </View>
      </View>
  );
};

export default LogEntry;