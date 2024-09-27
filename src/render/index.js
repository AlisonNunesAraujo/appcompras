import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Render({ data }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.conteiner}>
        <Text style={styles.text}>{data.produto}</Text>
        <Ionicons name="cart" size={18} color="white" style={styles.icone} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    alignItems: "center",
  },
  conteiner: {
    width: "90%",
    height: 60,
    borderRadius: 4,
    backgroundColor: "black",
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 0.3,
  },
  text: {
    fontSize: 14,
    fontWeight: "800",
    marginLeft: 15,
    margin: 15,
    fontStyle: "italic",
    color: "white",
  },
  icone: {
    marginRight: 10,
    
  },
});
