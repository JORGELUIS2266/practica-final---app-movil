import React, { useState, useRef, useEffect } from "react";
import { 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  ScrollView, 
  Dimensions, 
  SafeAreaView, 
  Animated, 
  TouchableOpacity 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function InicioPantalla() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const hora = new Date().getHours();
  const saludo = hora < 12 ? "Buenos días" : hora < 18 ? "Buenas tardes" : "Buenas noches";

  const stats = [
    { label: "Alumnos", value:  1230 },
    { label: "Carreras", value: 7 },
    { label: "Eventos", value: 5 },
  ];

  // Datos de las carreras con estado expandido
  const [carreras, setCarreras] = useState([
    { 
      name: "Ingeniería en Sistemas", 
      icon: "laptop-outline", 
      img: "https://placeimg.com/100/80/tech",
      desc: "Formación en desarrollo de software, redes y administración de sistemas.",
      expanded: false
    },
    { 
      name: "Ingeniería Industrial", 
      icon: "construct-outline", 
      img: "https://placeimg.com/100/80/arch",
      desc: "Optimización de procesos, logística y gestión de producción.",
      expanded: false
    },
    { 
      name: "Ingeniería Civil", 
      icon: "business-outline", 
      img: "https://placeimg.com/100/80/buildings",
      desc: "Diseño, construcción y mantenimiento de infraestructura y obras civiles.",
      expanded: false
    },
    { 
      name: "Ingeniería en Mecatrónica", 
      icon: "hardware-chip-outline", 
      img: "https://placeimg.com/100/80/tech",
      desc: "Integración de electrónica, mecánica y control de sistemas automatizados.",
      expanded: false
    },
    { 
      name: "Administración", 
      icon: "business-outline", 
      img: "https://placeimg.com/100/80/business",
      desc: "Gestión de empresas, recursos humanos y toma de decisiones estratégicas.",
      expanded: false
    },
    { 
      name: "Arquitectura", 
      icon: "home-outline", 
      img: "https://placeimg.com/100/80/arch",
      desc: "Diseño y planificación de espacios, edificios y entornos urbanos.",
      expanded: false
    },
    { 
      name: "Ingeniería en Gestión Empresarial", 
      icon: "briefcase-outline", 
      img: "https://placeimg.com/100/80/business",
      desc: "Formación en administración de empresas con enfoque en proyectos y finanzas.",
      expanded: false
    },
  ]);

  // Función para alternar expandido/colapsado
  const toggleExpand = (index) => {
    const nuevasCarreras = [...carreras];
    nuevasCarreras[index].expanded = !nuevasCarreras[index].expanded;
    setCarreras(nuevasCarreras);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 40 }}>

        {/* Card de bienvenida */}
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: cardAnim,
              transform: [{ translateY: cardAnim.interpolate({ inputRange: [0,1], outputRange: [50,0] }) }]
            }
          ]}
        >
          <Ionicons name="school" size={70} color="#00fff7" style={styles.icon} />
          <Text style={styles.title}>{`${saludo}, bienvenido`}</Text>
          <Text style={styles.subtitle}>
            Esta aplicación te permite registrar alumnos y consultar la información 
            de los estudiantes del Instituto Tecnológico de Tlaxiaco.
          </Text>
        </Animated.View>

        {/* Tarjetas estadísticas */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statNumber}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        {/* Tarjetas de carreras */}
        <Text style={styles.sectionTitle}>Carreras del ITT Tlaxiaco</Text>
        <View style={styles.carrerasContainer}>
          {carreras.map((carrera, index) => (
            <View key={index} style={styles.carreraCard}>
              <Image source={{ uri: carrera.img }} style={styles.carreraImg} />
              <Ionicons name={carrera.icon} size={40} color="#00fff7" style={{ marginBottom: 10 }} />
              <Text style={styles.carreraTitle}>{carrera.name}</Text>

              {/* Descripción expandible */}
              {carrera.expanded && (
                <Text style={styles.carreraDesc}>{carrera.desc}</Text>
              )}

              <TouchableOpacity 
                style={styles.carreraButton} 
                onPress={() => toggleExpand(index)}
              >
                <Text style={styles.carreraButtonText}>
                  {carrera.expanded ? "Ver menos" : "Ver más"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0A0F2D" },
  card: {
    width: "90%", backgroundColor: "rgba(27,31,77,0.95)", borderRadius: 20,
    padding: 25, alignItems: "center", marginBottom: 20, shadowColor: "#00e8f8ff",
    shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 12,
    elevation: 8, borderWidth: 1, borderColor: "#00F0FF",
  },
  icon: { marginBottom: 10, textShadowColor: "#000000ff", textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  title: { fontSize: 26, fontWeight: "bold", color: "#00F0FF", textAlign: "center", marginBottom: 20 },
  subtitle: { fontSize: 16, color: "#00F0FF", textAlign: "center", lineHeight: 22 },

  statsContainer: { flexDirection: "row", justifyContent: "space-around", width: "90%", marginBottom: 20 },
  statCard: { backgroundColor: "rgba(0,255,247,0.1)", borderRadius: 15, padding: 15, alignItems: "center", width: width*0.25 },
  statNumber: { fontSize: 22, fontWeight: "bold", color: "#00fff7" },
  statLabel: { fontSize: 14, color: "#00fff7", marginTop: 5, textAlign: "center" },

  sectionTitle: { fontSize:22, fontWeight:"bold", color:"#00fff7", marginBottom:15, textAlign:"center" },
  carrerasContainer: { flexDirection:"row", flexWrap:"wrap", justifyContent:"center" },
  carreraCard: { backgroundColor:"rgba(27,31,77,0.9)", width:width*0.42, margin:8, borderRadius:15, alignItems:"center", padding:10, borderWidth:1, borderColor:"#00fff7" },
  carreraImg: { width:"100%", height:80, borderRadius:10, marginBottom:10 },
  carreraTitle: { color:"#00fff7", fontWeight:"bold", fontSize:14, textAlign:"center", marginBottom:10 },
  carreraDesc: { color:"#00fff7", fontSize:12, textAlign:"center", marginBottom:10 },
  carreraButton: { backgroundColor:"#00fff7", borderRadius:8, paddingVertical:6, paddingHorizontal:15 },
  carreraButtonText: { color:"#0A0F2D", fontWeight:"bold" },
});
