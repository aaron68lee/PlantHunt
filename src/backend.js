import { React, useState } from "react";
import { Dimensions, Text, View, ScrollView } from "react-native";
import { firebaseConfig} from '../firebase-config.js' // db, auth, provider, app, 
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer, useNavigation} from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

// import BACKEND packages
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import {orderBy, onSnapshot, limit, doc, collection, addDoc, getDocs, updateDoc, setDoc, query, where, getDoc} from "firebase/firestore"; 

// import components
import CustomButton from "../src/components/CustomButton";
import InputField from "../src/components/InputField";
import { Button } from "react-native-paper";



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebases
const app = firebase.initializeApp(firebaseConfig);

 const db = getFirestore(app)
 const auth = getAuth(app);
 const provider = new GoogleAuthProvider();


// write data to the database
// ========================== Write: User Found a Plant ===========================
async function logPlant(userID, plantName) 
{

  //userID = "aOvYVOE9XUSJcjCriC73dtVf4vn2"
  console.log("OG UID: " + userID);

  const currUser = db.collection('users')
    
  currUser.where('uid', '==', userID)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
    .catch((error) => {
      console.error("Error getting users: ", error);
  });

  

  /*
  collectionRef.where('uid', '==', userID).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        console.log("Doc: " + JSON.stringify(doc));
      });
    })
    .catch(err => {
      console.error('Error finding user: ', err);
    });
  */

  userID = "7FwPhxuKgSkJYQQBGxv9";
  const userRef = doc(db, "users", userID);
  console.log("UserID: " + userID + "\nPlant: " + plantName)

  try {
    // Get the user document from Firestore
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // If the user document exists, update the plants array
      const updatedPlants = [...userDoc.data().plants, plantName];
      await updateDoc(userRef, { plants: updatedPlants });
      console.log(`Successfully added ${plantName} to user ${userID}`);
    } else {
      console.log(`User with id ${userID} does not exist.`);
    }
  } catch (error) {
    console.error(`Error adding plant to user ${userID}: ${error}`);
  }
  // old code 
  /*
  try {
    console.log(auth.currentUser);

      
      return userRef.update({
        points: firebase.firestore.FieldValue.increment(10)
      })
      .then(() => {
        console.log("User points updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user points: ", error);
      });
      
      
      const docRef = await addDoc(collection(db, "users"), {
        uid: user ? user.uid : null,
        
      }).then(
        console.log("Plant Logged!"),
      );

      
    
      console.log("Document written with ID: " + docRef.id);
      return docRef.id;
  } catch (e) {
      console.error("Error adding document: ", e);
      return null;
  }
  */

  // new code 

}

// ========================== Read: User Adventure ===========================
async function getAdventure(userID, adventureID) 
{
 
  let user = auth.currentUser;
  const ref = collection(db, 'users').doc(userID);

  ref.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      //const newCount = (data.count || 0) + 1;
      //doc.ref.update({ count: newCount });
    });
  }).catch((error) => {
    console.error('Error updating user counts: ', error);
  });
  
  // old code 

  try {
    console.log(auth.currentUser);

      const docRef = await addDoc(collection(db, "users"), {
        uid: user ? user.uid : null,
        
      }).then(
        console.log("Plant Logged!"),
      );
    
      console.log("Document written with ID: " + docRef.id);
      return docRef.id;
  } catch (e) {
      console.error("Error adding document: ", e);
      return null;
  }
    
}

// ========================== Read: Get Plants ===========================

async function getPlants(userId) {
  
  try {
    const userDocRef = doc(db, "users", userId);
    const userDoc = await getDoc(userDocRef);
    console.log(userDoc.data().plants);
  } catch (error) {
    console.log("Error: ", error);
  }


  const userData = userDoc.data();
  console.log(JSON.stringify(userData));
  return userData.plants;
}


// ========================== SignOut ===========================
// component displayed when user IS signed in 
function SignOut()
{
  const navigation = useNavigation();
  return auth.currentUser && (
    <div>
    <button className="signOut" onPress={() => {
      navigation.navigate("Login");
      auth.signOut();
      }}>Sign Out
    </button>
    </div>
  )
}

function SignIn()
{


  const navigation = useNavigation();

  const handleSignIn = () => {

    // Check if the user is on a mobile platform
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Use signInWithRedirect for mobile platforms and signInWithPopup for others
    if (isMobile) {
      firebase
        .auth()
        .signInWithRedirect(provider)
        .then(() => {
          firebase
            .auth()
            .getRedirectResult()
            .then((result) => {
              // Handle successful sign-in
              navigation.navigate("Home");
            })
            .catch((error) => {
              // Handle errors
              console.error(error);
            });
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    } else {
        console.log("logged in???")
        navigation.navigate("Home");
          
    }
  };
  
  return (
    <Text>
      <Button className="signIn" 
        onPress={() =>{
          //useSignInWithGoogle();
          handleSignIn();

        }}>Sign in with Google</Button>
      </Text>
    );
}

export 
{
  logPlant,
  getAdventure,
  SignOut,
  SignIn,
  getPlants
}