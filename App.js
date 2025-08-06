// App.js - Versión simple para empezar
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Por ahora importamos solo el LoginScreen
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState("loading");

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Verificar si hay usuario guardado localmente
      const savedUser = await AsyncStorage.getItem("saved_user");

      if (savedUser) {
        setCurrentScreen("dashboard"); // Usuario ya configurado
      } else {
        setCurrentScreen("login"); // Primera vez
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      setCurrentScreen("login");
    }
  };

  // Función para navegar (simulando navegación)
  const navigate = (screen) => {
    setCurrentScreen(screen);
  };

  // Pantalla de carga
  if (currentScreen === "loading") {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  // Dashboard temporal
  if (currentScreen === "dashboard") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Bienvenido al Dashboard!</Text>
        <Text style={styles.subtitle}>Aquí crearemos el dashboard completo después de instalar las dependencias de navegación.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await AsyncStorage.multiRemove(["saved_user", "user_pin", "use_biometric"]);
            setCurrentScreen("login");
          }}
        >
          <Text style={styles.buttonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Mostrar Login
  return <LoginScreen navigation={{ replace: navigate }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 30,
  },
  loadingText: {
    fontSize: 18,
    color: "#666",
  },
  button: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
