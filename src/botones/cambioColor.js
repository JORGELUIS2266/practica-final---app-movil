import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CambioColor({ navigation }) {
  const [colorFondo, setColorFondo] = useState("#0A0F2D"); // Fondo oscuro inicial

  const cambiarColor = () => {
    const colores = ["#0A0F2D", "#1B1F4D", "#00F0FF", "#55efc4", "#fab1a0", "#ffeaa7"];
    const random = Math.floor(Math.random() * colores.length);
    setColorFondo(colores[random]);
  };

  // useEffect para mostrar mensaje cada vez que colorFondo cambie
  useEffect(() => {
    console.log("El color de fondo ha cambiado a:", colorFondo);
  }, [colorFondo]); // <- Dependencia: se ejecuta cada vez que colorFondo cambie

  // useEffect al montar la pantalla (como componentDidMount)
  useEffect(() => {
    console.log("Pantalla de CambioColor montada");
  }, []); // <- array vacío: se ejecuta solo una vez al montar

  return (
    <View style={[styles.container, { backgroundColor: colorFondo }]}>
      <StatusBar barStyle="light-content" />

      {/* Botón de cambiar color */}
      <TouchableOpacity style={styles.topButton} onPress={cambiarColor}>
        <Ionicons name="color-palette-outline" size={28} color="#00F0FF" />
      </TouchableOpacity>

      <Text style={styles.title}>Pantalla de Cambio de Color</Text>
      <Text style={styles.subtitle}>¡Presiona el botón para cambiar el fondo!</Text>
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
    fontSize: 28,
    fontWeight: "bold",
    color: "#00F0FF",
    textAlign: "center",
    textShadowColor: "#00F0FF",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginTop: 5,
    opacity: 0.8
  },
  topButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#1B1F4D",
    padding: 12,
    borderRadius: 50,
    elevation: 8,
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10
  },
});
