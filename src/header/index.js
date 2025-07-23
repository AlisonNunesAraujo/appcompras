import { View, Text, SafeAreaView, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.group}>
      <Text style={styles.title}>Bem Vindo!</Text>
      <Text style={styles.subTitle}>Monte a sua lista de compras!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    width: "100%",
    height: 140,
    backgroundColor: "blue",
    justifyContent: "center",
  },
  title: {
    margin: 10,
    marginLeft: 20,
    fontSize: 30,
    fontWeight: "semibold",
    color: "white",
    fontFamily: 'Arial'
  },
  subTitle: {
    marginStart: 20,
    fontSize: 18,
    color: "white",
    fontWeight: "semibold",
    fontFamily: 'Arial'
  },
});
