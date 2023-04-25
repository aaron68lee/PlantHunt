import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { app, auth, db} from '../firebase-config.js' // db, auth, provider, app, 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { StyleSheet } from "react-native";

// import LoginSVG from '../assets/images/misc/login.svg'
// import GoogleSVG from '../assets/images/misc/google.svg';
// import FacebookSVG from '../assets/images/misc/facebook.svg';
// import TwitterSVG from '../assets/images/misc/twitter.svg';

import CustomButton from "../src/components/CustomButton";
import InputField from "../src/components/InputField";

const { width, height } = Dimensions.get("window");

const SignupView = ({ navigation }) => {
  // State variables for the user's name, email, and password
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (value) => {
    //setName(value);
    console.log("name value: " + value)
  };

  // Function to handle sign-up button press
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleRegister = async => {
    // Code to handle sign-up process
    alert("Signed Up Successfully!");
    console.log("User Signed Up!");
    
    
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Login");
        // Save user data to Firestore
        
        const usersRef = collection(db, "users");

        addDoc(usersRef, {
          uid: user.uid,
          name: name,
          email: email,
          password: password,
          plants: [],
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error: " + error)
      });
      
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
            Register
          </Text>

          <Text
            style={{ textAlign: "center", color: "#666", marginBottom: 30 }}
          >
            Welcome to PlantHunt!
          </Text>

            
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={text => setName(text)}
              style={styles.input}
            />
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

          <CustomButton label={"Register"} onPress={handleRegister} />

          <Text>Already registered?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={{ color: "#0d422d", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


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

export default SignupView;
