import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRq1nb-_qZHBH29KijWu1dsdczNDqGnhM",
  authDomain: "sowwebsite-50dec.firebaseapp.com",
  databaseURL: "https://sowwebsite-50dec-default-rtdb.firebaseio.com",
  projectId: "sowwebsite-50dec",
  storageBucket: "sowwebsite-50dec.appspot.com",
  messagingSenderId: "186986415272",
  appId: "1:186986415272:web:ed465469535cb021ca2e9d",
  measurementId: "G-QDDP5K0ZY1",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};

const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};
