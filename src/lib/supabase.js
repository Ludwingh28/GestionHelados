// lib/supabase.js

/*
import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Reemplaza estas URLs con las de tu proyecto Supabase
const supabaseUrl = "https://bzcumyihvikcmkcuyiai.supabase.co"; // Por ejemplo: 'https://xyzcompany.supabase.co'
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6Y3VteWlodmlrY21rY3V5aWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NTczNjcsImV4cCI6MjA3MDAzMzM2N30.zh5n1P2S71ROXpJUbR5wqDdS0d5UPQfCDb85tRFdfCo"; // Tu clave anónima de Supabase

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  return supabase.auth.getUser();
};

// Función para cerrar sesión
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (!error) {
    // Limpiar datos locales
    await AsyncStorage.multiRemove(["saved_user", "user_pin", "use_biometric"]);
  }
  return { error };
};
*/
// Función para verificar si el usuario está autenticado
export const isAuthenticated = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session !== null;
};
