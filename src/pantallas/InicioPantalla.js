import React, { useState, useRef, useEffect } from "react";
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, SafeAreaView, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function InicioPantalla() {
  const imagenes = [
    "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2018/10/yakuin-410x250.png",
    "https://www.cdcuauhtemoc.tecnm.mx/wp-content/uploads/2021/08/cropped-6471adb1-bba1-4dbc-851a-5d6cc64f660a-copia.png",
    "https://www.tlaxiaco.tecnm.mx/wp-content/uploads/2018/10/yakuin-410x250.png",
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const cardAnim = useRef(new Animated.Value(0)).current;
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada del card
    Animated.timing(cardAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: (event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / (width * 0.9 + width * 0.05 * 2));
        setActiveIndex(index);
      }
    }
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* 🔹 Card de bienvenida con animación */}
        <Animated.View 
          style={[
            styles.card,
            {
              opacity: cardAnim,
              transform: [
                {
                  translateY: cardAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0]  // entra desde abajo
                  })
                }
              ]
            }
          ]}
        >
          <Ionicons name="school" size={70} color="#00fff7" style={styles.icon} />
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>
            Esta aplicación te permite registrar alumnos y consultar la información 
            de los estudiantes del Instituto Tecnológico de Tlaxiaco. 
            Aquí puedes visualizar los registros y gestionar los datos fácilmente.
          </Text>
        </Animated.View>

        {/* 🔹 Carrusel de imágenes con animación de escala */}
        <View style={styles.carouselContainer}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{ paddingVertical: 10 }}
          >
            {imagenes.map((img, index) => {
              const inputRange = [
                (index - 1) * width,
                index * width,
                (index + 1) * width,
              ];

              const scale = scrollX.interpolate({
                inputRange,
                outputRange: [0.85, 1, 0.85],
                extrapolate: "clamp"
              });

              return (
                <Animated.View key={index} style={[styles.imageWrapper, { transform: [{ scale }] }]}>
                  <Image
                    source={{ uri: img }}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </Animated.View>
              );
            })}
          </Animated.ScrollView>

          {/* 🔹 Indicadores de página con animación */}
          <View style={styles.dotsContainer}>
            {imagenes.map((_, index) => {
              const dotSize = activeIndex === index ? 14 : 10;
              const dotColor = activeIndex === index ? "#00fff7" : "#00000050";
              return (
                <Animated.View
                  key={index}
                  style={[styles.dot, { width: dotSize, height: dotSize, backgroundColor: dotColor }]}
                />
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#1B1F4D" },
  container: { flex: 1, alignItems: "center", backgroundColor: "#1B1F4D", paddingTop: 20 },

  card: {
    width: "90%",
    backgroundColor: "rgba(27,31,77,0.95)",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#00e8f8ff",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1, borderColor: "#00F0FF",
  },
  
  icon: {
    marginBottom: 10,
    textShadowColor: "#000000ff",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
 title: { fontSize: 26, fontWeight: "bold", color: "#00F0FF", textAlign: "center", marginBottom: 20 },

  subtitle: {
    fontSize: 16,
    color: "#00F0FF",
    textAlign: "center",
    lineHeight: 22,
  },

  carouselContainer: {
    alignItems: "center",
  },
  imageWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    marginHorizontal: width * 0.025,
  },
  image: {
    width: width * 0.9,
    height: 180,
    borderRadius: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  dot: {
    borderRadius: 15,
    marginHorizontal: 15,
  },
});
