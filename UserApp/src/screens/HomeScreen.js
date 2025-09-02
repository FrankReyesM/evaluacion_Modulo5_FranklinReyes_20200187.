import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { globalStyles, colors } from '../styles/globalStyles';

export default function HomeScreen({ navigation }) {
  const { logout, getUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  // Recargar datos cuando volvemos de EditProfile
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const fetchUserData = async () => {
    setLoading(true);
    const data = await getUserData();
    setUserData(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Cerrar Sesión', 
          style: 'destructive',
          onPress: async () => {
            const result = await logout();
            if (!result.success) {
              Alert.alert('Error', result.error);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[globalStyles.subtitle, { marginTop: 16 }]}>
          Cargando tu perfil...
        </Text>
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, { paddingVertical: 60 }]}>
      <Text style={globalStyles.title}>¡Hola{userData?.nombre ? `, ${userData.nombre.split(' ')[0]}` : ''}!</Text>
      
      {userData && (
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Mi Perfil</Text>
          <Text style={globalStyles.cardText}>📧 {userData.email}</Text>
          {userData.nombre && <Text style={globalStyles.cardText}>👤 {userData.nombre}</Text>}
          {userData.edad && <Text style={globalStyles.cardText}>🎂 {userData.edad} años</Text>}
          {userData.especialidad && <Text style={globalStyles.cardText}>💼 {userData.especialidad}</Text>}
        </View>
      )}
      
      <TouchableOpacity 
        style={globalStyles.button} 
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={globalStyles.buttonText}>✏️ Editar Perfil</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={globalStyles.buttonDanger} onPress={handleLogout}>
        <Text style={globalStyles.buttonText}>🚪 Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}