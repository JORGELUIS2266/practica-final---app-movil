import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Animated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function CambioColor() {
  const colores = ["#0A0F2D", "#1B1F4D", "#0A0F2D", "#000000ff", "#0A0F2D", "#000000ff"];
  const [indice, setIndice] = useState(0);
  const [indicePrev, setIndicePrev] = useState(0);
  const [colorFondo, setColorFondo] = useState(colores[indice]);
  const [mensaje, setMensaje] = useState("↔ Igual");

  const animValue = new Animated.Value(0);

  const cambiarColor = () => {
    const nuevoIndice = (indice + 1) % colores.length;
    setIndicePrev(indice);
    setIndice(nuevoIndice);
    setColorFondo(colores[nuevoIndice]);

    animValue.setValue(0);
    Animated.timing(animValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false
    }).start();
  };

  useEffect(() => {
    let estado;
    if (indice > indicePrev) estado = "⬆ Incrementó";
    else if (indice < indicePrev) estado = "⬇ Disminuyó (reinicio)";
    else estado = "↔ Igual";
    setMensaje(estado);
  }, [indice, indicePrev]);

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1]
  });

  return (
    <View style={[styles.container, { backgroundColor: colorFondo }]}>
      <StatusBar barStyle="light-content" />

      {/* Card central */}
      <View style={styles.card}>
        <Text style={styles.title}>🎨 Cambio de Color</Text>
        <Text style={styles.subtitle}>¡Presiona el botón y mira cómo cambia el fondo!</Text>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>Índice de color: {indice}</Text>
          <Text style={styles.counterState}>{mensaje}</Text>
        </View>

        <Animated.View style={{ transform: [{ scale }], marginTop: 20 }}>
          <TouchableOpacity style={styles.button} onPress={cambiarColor}>
            <Ionicons name="color-palette-outline" size={28} color="#26f1ffff" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Decoración de fondo */}
      <View style={styles.decorativeCircle} />
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
  card: {
    width: "90%",
    backgroundColor: "rgba(27,31,77,0.95)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#00F0FF",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    opacity: 0.9
  },
  counterContainer: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5
  },
  counterText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5
  },
  counterState: {
    fontSize: 16,
    color: "#00F0FF",
    fontWeight: "600"
  },
  button: {
    backgroundColor: "#1B1F4D",
    padding: 14,
    borderRadius: 50,
    elevation: 10,
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10
  },
  decorativeCircle: {
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#00F0FF33",
    bottom: -50,
    left: -50,
    zIndex: 0
  }
});
