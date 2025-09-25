// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import InicioPantalla from "./src/pantallas/InicioPantalla";
import CambioColor from "./src/botones/cambioColor";
import Formulario from "./src/pantallas/FormularioAlumnoPantalla";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#00065cff",
            borderTopLeftRadius: 2,
            borderTopRightRadius: 2,
            height: 60,
          },
          tabBarIcon: ({ color, size }) => {
            if (route.name === "Inicio") {
              return <Ionicons name="home-outline" size={size} color={color} />;
            } else if (route.name === "Formulario") {
              return (
                <Ionicons name="document-text-outline" size={size} color={color} />
              );
            } else if (route.name === "Color") {
              return (
                <Ionicons name="color-palette-outline" size={size} color={color} />
              );
            }
          },
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#dfe6e9",
        })}
      >
        <Tab.Screen name="Inicio" component={InicioPantalla} />
        <Tab.Screen name="Formulario" component={Formulario} />
        <Tab.Screen name="Color" component={CambioColor} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
