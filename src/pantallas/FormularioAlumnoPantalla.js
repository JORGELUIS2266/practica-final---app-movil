import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";

const API_URL = "http://192.168.1.217:3000/api/alumnos";

export default function FormularioAlumnoPantalla({ route, navigation }) {
  const alumnoParam = route.params?.alumno; // Si viene desde edición

  const [alumno, setAlumno] = useState(null); // Alumno en edición
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numControl, setNumControl] = useState("");
  const [telefono, setTelefono] = useState("");
  const [semestre, setSemestre] = useState("");
  const [carrera, setCarrera] = useState("");

  useEffect(() => {
    if (alumnoParam) {
      // Si viene un alumno desde la lista, cargar datos en modo edición
      setAlumno(alumnoParam);
      setNombre(alumnoParam.nombre);
      setEmail(alumnoParam.email);
      setNumControl(alumnoParam.numControl || "");
      setTelefono(alumnoParam.telefono || "");
      setSemestre(alumnoParam.semestre?.toString() || "");
      setCarrera(alumnoParam.carrera || "");
    } else {
      // Modo registro
      limpiarCampos();
    }
  }, [alumnoParam]);

  const limpiarCampos = () => {
    setAlumno(null);
    setNombre("");
    setEmail("");
    setNumControl("");
    setTelefono("");
    setSemestre("");
    setCarrera("");
  };

  const enviarFormulario = async () => {
    if (!nombre || !email || !numControl || !telefono || !semestre || !carrera) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const data = {
      nombre,
      email,
      numControl,
      telefono,
      semestre: parseInt(semestre),
      carrera
    };

    try {
      if (alumno) {
        // Edición
        await axios.put(`${API_URL}/${alumno.id}`, data);
        Alert.alert("Éxito", "Alumno actualizado correctamente");
      } else {
        // Registro
        await axios.post(API_URL, data);
        Alert.alert("Éxito", "Alumno registrado correctamente");
      }

      // Limpiar campos y regresar a modo registro
      limpiarCampos();

      // Remover alumno de route params para que no vuelva a modo edición
      navigation.setParams({ alumno: null });
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo enviar el formulario");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{alumno ? "Editar Alumno" : "Registro de Alumno"}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Personal</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu nombre" value={nombre} onChangeText={setNombre} />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu email" value={email} onChangeText={setEmail} keyboardType="email-address" />
        <Text style={styles.label}>Número de Control</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu número de control" value={numControl} onChangeText={setNumControl} keyboardType="numeric" />
        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Académica</Text>
        <Text style={styles.label}>Semestre</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu semestre" value={semestre} onChangeText={setSemestre} keyboardType="numeric" />
        <Text style={styles.label}>Carrera</Text>
        <TextInput style={styles.input} placeholder="Ingresa tu carrera" value={carrera} onChangeText={setCarrera} />
      </View>

      <TouchableOpacity style={styles.button} onPress={enviarFormulario}>
        <Text style={styles.buttonText}>{alumno ? "Actualizar" : "Registrar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F2D", padding: 15 },
  title: {
    fontSize: 26, fontWeight: "bold", color: "#00F0FF",
    textAlign: "center", marginBottom: 20,
    textShadowColor: "#00F0FF", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5
  },
  card: {
    backgroundColor: "#1B1F4D", borderRadius: 12, padding: 15, marginBottom: 20,
    shadowColor: "#00F0FF", shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.4,
    shadowRadius: 10, elevation: 10
  },
  cardTitle: { fontSize: 20, fontWeight: "600", color: "#00F0FF", marginBottom: 15 },
  label: { color: "#00F0FF", fontWeight: "600", marginBottom: 5, fontSize: 14 },
  input: { borderWidth: 1, borderColor: "#00F0FF", borderRadius: 8, padding: 12, marginBottom: 15, backgroundColor: "#a2a6c2ff", color: "#fff" },
  button: { backgroundColor: "#00F0FF", padding: 15, borderRadius: 12, alignItems: "center", marginBottom: 30 },
  buttonText: { color: "#0A0F2D", fontSize: 18, fontWeight: "bold" }
  ,
  
});
