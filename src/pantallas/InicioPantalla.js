// src/pantallas/InicioPantalla.js
import React, { useState } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function InicioPantalla() {
  const imagenes = [
    "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2018/10/yakuin-410x250.png",
    "https://www.cdcuauhtemoc.tecnm.mx/wp-content/uploads/2021/08/cropped-6471adb1-bba1-4dbc-851a-5d6cc64f660a-copia.png",
    "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2018/10/yakuin-410x250.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width * 0.9 + width * 0.05 * 2));
    setActiveIndex(index);
  };

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

      {/* 🔹 Carrusel básico bonito */}
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {imagenes.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </ScrollView>

        {/* 🔹 Indicadores de página */}
        <View style={styles.dotsContainer}>
          {imagenes.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                { backgroundColor: index === activeIndex ? "#00fff7" : "#ffffff50" },
              ]}
            />
          ))}
        </View>
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
    width: width * 0.9,
    height: 250,
    borderRadius: 20,
    marginHorizontal: width * 0.05,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5, // para Android
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
