import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBRq1nb-_qZHBH29KijWu1dsdczNDqGnhM",
  authDomain: "sowwebsite-50dec.firebaseapp.com",
  databaseURL: "https://sowwebsite-50dec-default-rtdb.firebaseio.com",
  projectId: "sowwebsite-50dec",
  storageBucket: "sowwebsite-50dec.appspot.com",
  messagingSenderId: "186986415272",
  appId: "1:186986415272:web:a6a4b69293b8e108ca2e9d",
  measurementId: "G-NJ09J2P912",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
