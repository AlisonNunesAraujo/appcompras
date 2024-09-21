import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  
} from "react-native";

import Toast from "react-native-toast-message";

import Ionincons from "@expo/vector-icons/Ionicons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Render from "../render";

export default function Home() {
  const [produto, setProduto] = useState("");
  const [carrinho, setCarrinho] = useState("");

  async function handleGetCart() {
    const response = await AsyncStorage.getItem("@comprasCarrinho:cart");
    const item = response ? JSON.parse(response) : [];

    setCarrinho(item);
  }

  async function handleNew() {
    if (produto === "") {
      Toast.show({
        type: "info",
        text1: "Voçê deve preencher todos os campos!",
      });
      return;
    }

    const dados = {
      produto,
    };

    try {
      const updateCart = [...carrinho, dados];

      setCarrinho(updateCart);

      await AsyncStorage.setItem(
        "@comprasCarrinho:cart",
        JSON.stringify(updateCart)
      );
      Toast.show({
        type: "success",
        text1: "Adicionando com sucesso!",
      });

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
    const response = await AsyncStorage.removeItem("@comprasCarrinho:cart");
    Toast.show({
      type: "success",
      text1: "Removido",
      text2: "Itens removido com sucesso!",
    });
  }

  function RendleButton() {
    if (carrinho.length > 0) {
      return (
        <TouchableOpacity onPress={Remove} style={styles.buttonRemove}>
          <Text style={styles.textRemove}>Limpar lista!</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.title}>
          Adicione itens no seu carrinho de compras!
        </Text>
        <TextInput
          placeholder="Item da compra!"
          value={produto}
          onChangeText={setProduto}
          maxLength={30}
          style={styles.input}
        />
        

        <TouchableOpacity onPress={handleNew} style={styles.button}>
          <Text style={styles.textbutton}>Adcionar no Carrinho!</Text>
        </TouchableOpacity>

        <View style={styles.infoCart}>
          <Text style={styles.textInfoCart}>
            No seu carrinho tem {carrinho.length} itens
          </Text>
          <Ionincons name="cart" size="25" color="red" />
        </View>

        <FlatList
          style={styles.flat}
          data={carrinho}
          renderItem={({ item }) => <Render data={item} />}
        />

        {RendleButton()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  input: {
    width: "90%",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    backgroundColor: "#808080",
    fontSize: 15,
    
  },

  flat: {
    width: "90%",
  },
  button: {
    backgroundColor: "red",
    padding: 10,
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
    justifyContent: "flex-end",
    marginBottom: 5,
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
    marginTop: 5,
  },
  infoCart: {
    width: "90%",
    height: 40,
    justifyContent: "space-evenly",
    marginTop: 10,
    flexDirection: "row",
  },
  textInfoCart: {
    color: "red",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "italic",
  },
});
