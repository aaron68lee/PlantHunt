import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { auth, provider } from "../firebase-config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SignIn } from "../src/backend.js";
import { NavigationContainer, useNavigation} from "@react-navigation/native";

// import LoginSVG from '../assets/images/misc/login.svg'
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from "../src/components/CustomButton";
import InputField from "../src/components/InputField";
import { Button } from "react-native-paper";

const { width, height } = Dimensions.get("window");
let currUser;

const LoginView = ({ navigation, route }) => {
  // State variables for the user's name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle sign-up button press
  const handleLogin = () => {
    console.log("Logging in...");
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        currUser = user;
        alert("Logged In!")
        navigation.navigate("Home"); 
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      route.params.setLogIn(true);
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center", padding: 5 }}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        horizontal={false}
        style={{ paddingHorizontal: 0 }}
      >
        <View
          style={{
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 0,
          }}
        >
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 30,
            }}
            
          >
            Login
          </Text>

          <Text
            style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
          >
            Welcome to PlantHunt!
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <CustomButton label={"Login"} onPress={handleLogin} />

          <Text>Haven't registered?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={{ color: "#0d422d", fontWeight: "700" }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginView;

export {
  currUser,
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 0,
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})