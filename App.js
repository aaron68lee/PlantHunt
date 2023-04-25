import { React, useState } from "react";
import { ModelProvider } from "./src/ModelContext";
import { Dimensions, View } from "react-native";
import CameraView from "./Views/Camera";
import HomeView from "./Views/Home";
import BaseHeader from "./Views/BaseHeader";
import LoginView from "./Views/Login";
import SignupView from "./Views/Signup";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import LogView from "./Views/Log";
import { createStackNavigator } from "@react-navigation/stack";
import AdventureView from "./Views/Adventure";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setLogIn] = useState(false);
  const [isAdventureMode, setAdventureMode] = useState(false);

  const updateAdventureMode = () => {
    console.log("switching to Adventure Mode");
    setAdventureMode(!isAdventureMode);
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      paddingTop: 50,
      borderWidth: 1,
      borderColor: "#000",
      borderRadius: 10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  if (!isLoggedIn) {
    return (
      <ModelProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginView}
              initialParams={{ setLogIn: setLogIn }}
            />
            <Stack.Screen name="Signup" component={SignupView} />
          </Stack.Navigator>
        </NavigationContainer>
      </ModelProvider>
    );
  }
  return (
    <ModelProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer style={styles.container}>
          <BaseHeader/>
          {isAdventureMode ? (
            <Stack.Navigator>
              <Stack.Screen name="Adventure Mode" component={AdventureView} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={{ tabBarStyle: { backgroundColor: "green" } }}
              tabBarOptions={{
                activeTintColor: "blue",
                inactiveTintColor: "gray",
                labelStyle: {
                  fontSize: 16,
                  fontWeight: "bold",
                },
                style: {
                  backgroundColor: "white",
                },
              }}
              initialRouteName="Home"
              tabBarPosition="bottom"
            >
              <Tab.Screen name="Camera 📷" component={CameraView} />
              <Tab.Screen name="Home" component={HomeView}/>
              <Tab.Screen name="Log 📒" component={LogView} />
              {/* TEMP FOR TESTING PURPOSES */}
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </View>
    </ModelProvider>
  );
}

// export default function App() {
//   return (
//     <View
//       style={{
//         width: width,
//         height: height,
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <BaseTemplate>
//         <CameraView />
//         <HomeView />
//       </BaseTemplate>
//     </View>
//   );
// }

// //outside return
// const scrollViewRef = useRef();
// useEffect(() => {
//   // Scroll to the rightmost edge of the ScrollView
//   scrollViewRef.current.scrollToEnd({ animated: false });
// }, []);

// //in return
// <ScrollView
//   ref={scrollViewRef}
//   snapToInterval={width}
//   decelerationRate="fast"
//   onContentSizeChange={(contentWidth, contentHeight) => {
//     // Set the initial position of the ScrollView to the rightmost edge
//     scrollViewRef.current.scrollTo({
//       x: contentWidth - scrollViewRef.current.clientWidth,
//       animated: false,
//     });
//   }}
//   horizontal
// >
//   <BaseTemplate>
//     <CameraView />
//     <HomeView />
//   </BaseTemplate>
// </ScrollView>;
