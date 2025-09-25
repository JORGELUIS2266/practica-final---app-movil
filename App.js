import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import InicioPantalla from "./src/pantallas/InicioPantalla";
import cambioColor from "./src/botones/cambioColor";
import FormularioAlumnoPantalla from "./src/pantallas/FormularioAlumnoPantalla";
import ListaAlumnosPantalla from "./src/pantallas/ListaAlumnosPantalla";

import { AlumnosProvider } from "./src/context/AlumnosContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AlumnosProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: {
              backgroundColor: "#00032eff",
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              height: 60,
            },
            tabBarIcon: ({ color, size }) => {
              if (route.name === "Inicio") {
                return <Ionicons name="home-outline" size={size} color={color} />;
              } else if (route.name === "Formulario") {
                return <Ionicons name="document-text-outline" size={size} color={color} />;
              } else if (route.name === "Lista") {
                return <Ionicons name="list-outline" size={size} color={color} />;
              } else if (route.name === "Color") {
                return <Ionicons name="color-palette-outline" size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: "#cea4a4ff",
            tabBarInactiveTintColor: "#ffffffff",
          })}
        >
          <Tab.Screen name="Inicio" component={InicioPantalla} />
          <Tab.Screen name="Formulario" component={FormularioAlumnoPantalla} />
          <Tab.Screen name="Lista" component={ListaAlumnosPantalla} />
          <Tab.Screen name="Color" component={cambioColor} />
        </Tab.Navigator>
      </NavigationContainer>
    </AlumnosProvider>
  );
}
