// src/pantallas/InicioPantalla.js
import React from "react";
import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function InicioPantalla() {
  // 🔹 Lista de imágenes para el carrusel
  const imagenes = [
    "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2018/10/yakuin-410x250.png",
    "https://www.vhv.rs/dpng/d/17-178726_tecnologico-nacional-de-mexico-logo-png-transparent-png.png",
    "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2018/10/yakuin-410x250.png",
  ];

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

      {/* 🔹 Carrusel de imágenes */}
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >
          {imagenes.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.image}
              resizeMode="contain"
            />
          ))}
        </ScrollView>
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
    textShadowColor: "#00a8a3ff",
    textShadowRadius: 15,
  },
  subtitle: {
    fontSize: 16,
    color: "#cfd8dc",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  carouselContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: width * 0.9, // ocupa casi toda la pantalla
    height: 250,
    borderRadius: 20,
    marginHorizontal: width * 0.05, // centra un poco la imagen
  },
});
