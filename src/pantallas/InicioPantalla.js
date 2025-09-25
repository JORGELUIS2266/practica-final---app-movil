// src/pantallas/InicioPantalla.js
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function InicioPantalla() {
  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      {/* 🔹 Encabezado de bienvenida */}
      <View style={styles.header}>
        <Ionicons name="school" size={70} color="#00fff7" style={styles.icon} />
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          Esta aplicación te permite registrar alumnos y consultar la información 
          de los estudiantes del Instituto Tecnológico de Tlaxiaco. 
          Aquí puedes visualizar los registros y gestionar los datos fácilmente.
        </Text>
      </View>

      {/* 🔹 Espacio para la imagen mediante URL */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2018/10/yakuin-410x250.png" }} // 👈 Reemplaza con tu URL
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    alignItems: "center",
    padding: 20,
  },
  icon: {
    marginBottom: 10,
    textShadowColor: "#00fff7",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "#00fff7",
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#cfd8dc",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: "90%",
    height: 250,
    borderRadius: 20,
  },
});
