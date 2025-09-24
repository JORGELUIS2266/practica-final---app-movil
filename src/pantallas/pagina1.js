// Pagina1.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Pagina1() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CRUD de Alumnos - Página 1</Text>
      <Text style={styles.subtitle}>Aquí puedes Listar, Registrar y Eliminar alumnos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#7f8c8d" },
});

import Pagina1 from './src/pantallas/Pagina1';
