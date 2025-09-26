// src/pantallas/ListaAlumnosPantalla.js
import React, { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, SafeAreaView } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// URL del backend usando tu IP local
const API_URL = "http://192.168.1.217:3000/api/alumnos";

export default function ListaAlumnosPantalla({ navigation }) {
  const [alumnos, setAlumnos] = useState([]);
  const [expandido, setExpandido] = useState(null);

  const cargarAlumnos = async () => {
    try {
      const response = await axios.get(API_URL);
      setAlumnos(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudieron cargar los alumnos");
    }
  };

  useFocusEffect(
    useCallback(() => {
      cargarAlumnos();
    }, [])
  );

  const eliminarAlumno = (id) => {
    Alert.alert(
      "Eliminar Alumno",
      "¿Deseas eliminar este alumno?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/${id}`);
              cargarAlumnos();
            } catch (error) {
              console.error(error);
              Alert.alert("Error", "No se pudo eliminar el alumno");
            }
          }
        }
      ]
    );
  };

  const toggleExpandido = (id) => {
    setExpandido(expandido === id ? null : id);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.imagen && (
        <Image
          source={{ uri: `http://192.168.1.217:3000${item.imagen}` }}
          style={styles.imagen}
        />
      )}
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.info}>No. Control: {item.numControl}</Text>

      {expandido === item.id && (
        <>
          <Text style={styles.info}>Email: {item.email}</Text>
          <Text style={styles.info}>Teléfono: {item.telefono}</Text>
          <Text style={styles.info}>Semestre: {item.semestre}</Text>
          <Text style={styles.info}>Carrera: {item.carrera}</Text>
        </>
      )}

      <View style={styles.botones}>
        <TouchableOpacity style={styles.verMas} onPress={() => toggleExpandido(item.id)}>
          <Ionicons
            name={expandido === item.id ? "chevron-up-outline" : "chevron-down-outline"}
            size={18}
            color="#0A0F2D"
            style={{ marginRight: 5 }}
          />
          <Text style={styles.verMasText}>{expandido === item.id ? "Ver menos" : "Ver más"}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.editar} 
          onPress={() => navigation.navigate("Formulario", { alumno: item })}
        >
          <Ionicons name="create-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.editarText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.eliminar} onPress={() => eliminarAlumno(item.id)}>
          <Ionicons name="trash-outline" size={18} color="#fff" style={{ marginRight: 5 }} />
          <Text style={styles.eliminarText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Lista de Alumnos</Text>
      <FlatList
        data={alumnos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={styles.container}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0A0F2D" },
  container: { padding: 15 },
  title: { fontSize: 26, fontWeight: "bold", color: "#00F0FF", textAlign: "center", marginVertical: 15 },
  card: {
    backgroundColor: "#1B1F4D",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#00F0FF",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    // borderWidth: 1, borderColor: "#00F0FF",
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#00F0FF"
  },
  nombre: { fontSize: 18, fontWeight: "600", color: "#00F0FF", marginBottom: 5, textAlign: "center" },
  info: { color: "#fff", fontSize: 14, marginBottom: 5, textAlign: "center" },
  botones: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  verMas: { flexDirection: "row", alignItems: "center", backgroundColor: "#00F0FF", padding: 8, borderRadius: 8 },
  verMasText: { color: "#0A0F2D", fontWeight: "600" },
  editar: { flexDirection: "row", alignItems: "center", backgroundColor: "#3498db", padding: 8, borderRadius: 8 },
  editarText: { color: "#fff", fontWeight: "600" },
  eliminar: { flexDirection: "row", alignItems: "center", backgroundColor: "#FF3B30", padding: 8, borderRadius: 8 },
  eliminarText: { color: "#fff", fontWeight: "600" },
});
