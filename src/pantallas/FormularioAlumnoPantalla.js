import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const API_URL = "http://192.168.1.217:3000/api/alumnos";

export default function FormularioAlumnoPantalla({ route, navigation }) {
  const alumnoParam = route.params?.alumno || null;

  const [alumno, setAlumno] = useState(null);
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [numControl, setNumControl] = useState("");
  const [telefono, setTelefono] = useState("");
  const [semestre, setSemestre] = useState("");
  const [carrera, setCarrera] = useState("");
  const [imagenUri, setImagenUri] = useState(null); // imagen local
  const [imagenPreviewUrl, setImagenPreviewUrl] = useState(null); // imagen del servidor

  // Pedir permisos para galería
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permiso requerido", "Necesitamos permiso para acceder a las imágenes.");
      }
    })();
  }, []);

  // Cargar datos si viene alumno para edición
  useEffect(() => {
    if (alumnoParam) {
      setAlumno(alumnoParam);
      setNombre(alumnoParam.nombre || "");
      setEmail(alumnoParam.email || "");
      setNumControl(alumnoParam.numControl || "");
      setTelefono(alumnoParam.telefono || "");
      setSemestre(alumnoParam.semestre?.toString() || "");
      setCarrera(alumnoParam.carrera || "");
      setImagenPreviewUrl(alumnoParam.imagen ? `http://192.168.1.217:3000${alumnoParam.imagen}` : null);
      setImagenUri(null);
    } else {
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
    setImagenUri(null);
    setImagenPreviewUrl(null);
  };

  const seleccionarImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      const uri = result.assets?.[0]?.uri ?? result.uri;
      setImagenUri(uri);
      setImagenPreviewUrl(null);
    }
  };

  const enviarFormulario = async () => {
    if (!nombre || !email || !numControl || !telefono || !semestre || !carrera) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("email", email);
    formData.append("numControl", numControl);
    formData.append("telefono", telefono);
    formData.append("semestre", semestre);
    formData.append("carrera", carrera);

    if (imagenUri) {
      const filename = imagenUri.split("/").pop();
      let match = /\.(\w+)$/.exec(filename);
      let ext = match ? match[1] : "jpg";
      const type = `image/${ext === "jpg" ? "jpeg" : ext}`;
      formData.append("imagen", { uri: imagenUri, name: filename, type });
    }

    try {
      if (alumno) {
        await axios.put(`${API_URL}/${alumno.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Alert.alert("Éxito", "Alumno actualizado correctamente");
      } else {
        await axios.post(API_URL, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        Alert.alert("Éxito", "Alumno registrado correctamente");
      }

      limpiarCampos();
      navigation.setParams({ alumno: null });
      navigation.navigate("Lista");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "No se pudo guardar el alumno");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{alumno ? "Editar Alumno" : "Registro de Alumno"}</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Personal</Text>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} value={nombre} onChangeText={setNombre} placeholder="Ingresa tu nombre" />
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholder="Ingresa tu email" />
        <Text style={styles.label}>Número de Control</Text>
        <TextInput style={styles.input} value={numControl} onChangeText={setNumControl} keyboardType="numeric" placeholder="Ingresa tu número de control" />
        <Text style={styles.label}>Teléfono</Text>
        <TextInput style={styles.input} value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" placeholder="Ingresa tu teléfono" />

        <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={seleccionarImagen}>
          <Text style={styles.buttonText}>Seleccionar imagen</Text>
        </TouchableOpacity>

        {imagenUri && <Image source={{ uri: imagenUri }} style={{ width: 120, height: 120, marginTop: 10, borderRadius: 8 }} />}
        {!imagenUri && imagenPreviewUrl && <Image source={{ uri: imagenPreviewUrl }} style={{ width: 120, height: 120, marginTop: 10, borderRadius: 8 }} />}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Información Académica</Text>
        <Text style={styles.label}>Semestre</Text>
        <TextInput style={styles.input} value={semestre} onChangeText={setSemestre} keyboardType="numeric" placeholder="Ingresa tu semestre" />
        <Text style={styles.label}>Carrera</Text>
        <TextInput style={styles.input} value={carrera} onChangeText={setCarrera} placeholder="Ingresa tu carrera" />
      </View>

      <TouchableOpacity style={styles.button} onPress={enviarFormulario}>
        <Text style={styles.buttonText}>{alumno ? "Actualizar" : "Registrar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A0F2D", padding: 15 },
  title: { fontSize: 26, fontWeight: "bold", color: "#00F0FF", textAlign: "center", marginBottom: 20 },
  card: { backgroundColor: "#1B1F4D", borderRadius: 12, padding: 15, marginBottom: 20 },
  cardTitle: { fontSize: 20, color: "#00F0FF", marginBottom: 10 },
  label: { color: "#00F0FF", marginBottom: 5 },
  input: { borderWidth: 1, borderColor: "#00F0FF", borderRadius: 8, padding: 10, marginBottom: 10, color: "#fff", backgroundColor: "#10153D" },
  button: { backgroundColor: "#00F0FF", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 10 },
  buttonText: { color: "#0A0F2D", fontWeight: "bold" },
});
