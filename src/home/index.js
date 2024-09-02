import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation} from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Render from "../render";

export default function Home() {
  const navigation = useNavigation();


  const [produto, setProduto] = useState("");
  const [carrinho, setCarrinho] = useState("");

  async function handleGetCart() {
    const response = await AsyncStorage.getItem("@compras:cart");
    const item = response ? JSON.parse(response) : [];

    setCarrinho(item);
  }

  async function handleNew() {
    if (produto === "") {
      alert("Preencha todos os campos!");
      return;
    }

    const dados = {
      produto,
    };

    try {
      const updateCart = [...carrinho, dados];
      setCarrinho(updateCart);
      await AsyncStorage.setItem("@compras:cart", JSON.stringify(updateCart));

      console.log(updateCart);

      setProduto("");
    } catch (err) {
      alert("ocorreu um erro!");
    }
  }

  useEffect(() => {
    handleGetCart();
  }, [Remove]);



  async function Remove() {
    const response = await AsyncStorage.removeItem("@compras:cart");
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>Adcione itens na sua lista!</Text>
        <TextInput
          placeholder="Produto da compra!"
          value={produto}
          onChangeText={setProduto}
          style={styles.inputs}
        />

        <TouchableOpacity onPress={handleNew} style={styles.button}>
          <Text style={styles.textbutton}>Adcionar no Carrinho!</Text>
        </TouchableOpacity>

        <FlatList
          style={styles.flat}
          data={carrinho}
          renderItem={({ item }) => <Render data={item} />}
        />

        <TouchableOpacity onPress={Remove} style={styles.buttonRemove}>
          <Text style={styles.textRemove}>Limpar lista!</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    width: "90%",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },

  flat: {
    marginTop: 40,
    width: "90%",
    height: "70%",
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    width: "90%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textbutton: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "italic",
  },
  buttonRemove: {
    backgroundColor: "red",
    padding: 15,
    width: "90%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textRemove: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
    fontStyle: "italic",
  },
  title: {
    fontSize: 18,
    fontStyle: "italic",
    color: "red",
    fontWeight: "bold",
    marginTop: 10,
  },
});
