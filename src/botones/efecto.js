import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";

export default function efecto() {
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(`El contador ha cambiado a: ${contador}`);
  }, [contador]); // se ejecuta cada vez que contador cambia

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
    </View>
  );
}
