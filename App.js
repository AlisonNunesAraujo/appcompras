import React from "react";
import Home from "./src/home";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";
export default function App() {
  return (
  <>
  <StatusBar  barStyle="default"/>
  <Home />
  <Toast/>
  </>
  )
  ;
}

