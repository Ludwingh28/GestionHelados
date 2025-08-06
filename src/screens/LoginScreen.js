// src/screens/LoginScreen.js - Versión simple para probar
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [savedUserEmail, setSavedUserEmail] = useState("");

  useEffect(() => {
    checkSavedUser();
  }, []);

  const checkSavedUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("saved_user");
      const userPin = await AsyncStorage.getItem("user_pin");

      if (savedUser && userPin) {
        setIsFirstTime(false);
        setSavedUserEmail(savedUser);
      }
    } catch (error) {
      console.error("Error checking saved user:", error);
    }
  };

  const handlePinLogin = async () => {
    if (pin.length !== 4) {
      Alert.alert("Error", "El PIN debe tener 4 dígitos");
      return;
    }

    try {
      const savedPin = await AsyncStorage.getItem("user_pin");
      if (savedPin === pin) {
        navigation.replace("dashboard");
      } else {
        Alert.alert("Error", "PIN incorrecto");
        setPin("");
      }
    } catch (error) {
      Alert.alert("Error", "Error al verificar el PIN");
    }
  };

  const handleFirstTimeLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    // Simulamos login exitoso por ahora (sin Supabase)
    setLoading(true);

    // Simulamos delay de red
    setTimeout(async () => {
      // Aquí normalmente harías la autenticación con Supabase
      // Por ahora solo simulamos que es exitoso

      Alert.alert("Configurar PIN", "Crea un PIN de 4 dígitos para futuros accesos", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: (pinInput) => {
            Alert.prompt(
              "Ingresa PIN",
              "PIN de 4 dígitos",
              [
                { text: "Cancelar", style: "cancel" },
                {
                  text: "OK",
                  onPress: async (inputPin) => {
                    if (inputPin && inputPin.length === 4 && /^\d+$/.test(inputPin)) {
                      await AsyncStorage.setItem("saved_user", email);
                      await AsyncStorage.setItem("user_pin", inputPin);
                      setLoading(false);
                      navigation.replace("dashboard");
                    } else {
                      Alert.alert("Error", "El PIN debe tener 4 dígitos numéricos");
                      setLoading(false);
                    }
                  },
                },
              ],
              "plain-text"
            );
          },
        },
      ]);
    }, 1000);
  };

  const renderFirstTimeLogin = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Correo electrónico" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!loading} />

        <TextInput style={styles.input} placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry={true} editable={!loading} />
      </View>

      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleFirstTimeLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Iniciando sesión..." : "Iniciar sesión"}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderReturnLogin = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Hola de nuevo!</Text>
        <Text style={styles.subtitle}>{savedUserEmail}</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.pinLabel}>Ingresa tu PIN</Text>
        <TextInput style={styles.pinInput} placeholder="----" value={pin} onChangeText={setPin} keyboardType="number-pad" maxLength={4} secureTextEntry={true} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePinLogin}>
        <Text style={styles.buttonText}>Acceder con PIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={async () => {
          await AsyncStorage.multiRemove(["saved_user", "user_pin"]);
          setIsFirstTime(true);
          setPin("");
          setEmail("");
          setPassword("");
        }}
      >
        <Text style={styles.linkText}>Iniciar con otra cuenta</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.safeContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.flex}>
        {isFirstTime ? renderFirstTimeLogin() : renderReturnLogin()}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 32,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6b7280",
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: "#3b82f6",
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#93c5fd",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  pinLabel: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 8,
    fontSize: 16,
  },
  pinInput: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    textAlign: "center",
    fontSize: 24,
    letterSpacing: 8,
  },
  linkButton: {
    marginTop: 16,
    alignItems: "center",
  },
  linkText: {
    color: "#6b7280",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
