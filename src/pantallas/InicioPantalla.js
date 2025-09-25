// src/pantallas/InicioPantalla.js
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // <- necesitas instalar expo-linear-gradient
import { Ionicons } from "@expo/vector-icons";

export default function InicioPantalla() {
  return (
    <LinearGradient
      colors={["#000428", "#004e92"]} // gradiente futurista
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name="planet" size={80} color="#00fff7" style={styles.icon} />

        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Explora el futuro con nuestra app</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Comenzar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 20,
    textShadowColor: "#00fff7",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "#00fff7",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#cfd8dc",
    textAlign: "center",
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#00fff7",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    shadowColor: "#00fff7",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000428",
  },
});
