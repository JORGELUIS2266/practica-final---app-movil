import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CambioColor({ navigation }) {
  const [colorFondo, setColorFondo] = useState("#f4f6f9");

  const cambiarColor = () => {
    const colores = ["#f4f6f9", "#ffeaa7", "#fab1a0", "#55efc4", "#81ecec", "#74b9ff"];
    const random = Math.floor(Math.random() * colores.length);
    setColorFondo(colores[random]);
  };

  return (
    <View style={[styles.container, { backgroundColor: colorFondo }]}>
      {/* Botón de cambiar color arriba a la derecha */}
      <TouchableOpacity style={styles.topButton} onPress={cambiarColor}>
        <Ionicons name="color-palette-outline" size={28} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Pantalla de Cambio de Color</Text>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 20 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#2c3e50" 
  },
  topButton: {
    position: "absolute",
    top: 40, // espacio desde arriba (ajusta según tu notch/status bar)
    right: 20, // espacio desde la derecha
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 50,
    elevation: 5, // sombra en Android
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5, // sombra en Android
  },
  navButton: {
    alignItems: "center",
  },
  navText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 3,
  },
});
