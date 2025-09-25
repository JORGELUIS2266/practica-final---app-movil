import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CambioColor() {
  const colores = ["#0A0F2D", "#1B1F4D", "#0A0F2D", "#000000ff", "#0A0F2D", "#000000ff"];
  const [indice, setIndice] = useState(0);      // Índice actual
  const [indicePrev, setIndicePrev] = useState(0); // Índice anterior
  const [colorFondo, setColorFondo] = useState(colores[indice]);
  const [mensaje, setMensaje] = useState("↔ Igual"); // Estado de incremento/disminución

  const cambiarColor = () => {
    const nuevoIndice = Math.floor(Math.random() * colores.length);
    setIndicePrev(indice);
    setIndice(nuevoIndice);
    setColorFondo(colores[nuevoIndice]);
  };

  // UseEffect para mostrar cambios en consola y actualizar mensaje en pantalla
  useEffect(() => {
    let estado;
    if (indice > indicePrev) estado = "⬆ Incrementó";
    else if (indice < indicePrev) estado = "⬇ Disminuyó";
    else estado = "↔ Igual";

    setMensaje(estado);
    console.log(`useEffect: Color cambiado a ${colorFondo} | Índice: ${indice} | Estado: ${estado}`);
  }, [colorFondo, indice, indicePrev]);

  return (
    <View style={[styles.container, { backgroundColor: colorFondo }]}>
      <StatusBar barStyle="light-content" />

      {/* Botón de cambiar color */}
      <TouchableOpacity style={styles.topButton} onPress={cambiarColor}>
        <Ionicons name="color-palette-outline" size={28} color="#26f1ffff" />
      </TouchableOpacity>

      <Text style={styles.title}>Cambio de Color</Text>
      <Text style={styles.subtitle}>¡Presiona el botón para cambiar el fondo!</Text>

      {/* Contador y estado del índice */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Índice de color: {indice}</Text>
        <Text style={styles.counterState}>{mensaje}</Text>
      </View>
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
    fontSize: 32,
    fontWeight: "bold",
    color: "#00F0FF",
    textAlign: "center",
    marginBottom: 8,
    textShadowColor: "#00a3a3ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.9
  },
  topButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#1B1F4D",
    padding: 14,
    borderRadius: 50,
    elevation: 10,
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10
  },
  counterContainer: {
    marginTop: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  counterText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5
  },
  counterState: {
    fontSize: 18,
    color: "#00F0FF",
    fontWeight: "600"
  }
});
