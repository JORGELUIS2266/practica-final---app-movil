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
              position: 'absolute',   // posición absoluta
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#00042880', // negro semitransparente
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: 70,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 10,
              paddingBottom: 10,
              paddingTop: 5,
            },
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "Inicio") iconName = "home-outline";
              else if (route.name === "Formulario") iconName = "document-text-outline";
              else if (route.name === "Lista") iconName = "list-outline";
              else if (route.name === "Color") iconName = "color-palette-outline";

              return <Ionicons name={iconName} size={28} color={color} />;
            },
            tabBarActiveTintColor: "#00fff7", 
            tabBarInactiveTintColor: "#ffffff80",
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "600",
            },
          })}
        >
          <Tab.Screen 
            name="Inicio" 
            component={InicioPantalla} 
            options={{ tabBarHideOnKeyboard: true }}
          />
          <Tab.Screen 
            name="Formulario" 
            component={FormularioAlumnoPantalla} 
            options={{ tabBarHideOnKeyboard: true }}
          />
          <Tab.Screen 
            name="Lista" 
            component={ListaAlumnosPantalla} 
            options={{ tabBarHideOnKeyboard: true }}
          />
          <Tab.Screen 
            name="Color" 
            component={cambioColor} 
            options={{ tabBarHideOnKeyboard: true }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </AlumnosProvider>
  );
}
