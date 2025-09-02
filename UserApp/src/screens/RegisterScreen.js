import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { globalStyles } from '../styles/globalStyles';

export default function RegisterScreen({ navigation }) {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    edad: '',
    especialidad: ''
  });

  const handleRegister = async () => {
    if (!formData.nombre || !formData.email || !formData.password) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      Alert.alert('Éxito', 'Cuenta creada correctamente');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingVertical: 60 }}>
        <Text style={globalStyles.title}>Crear Cuenta</Text>
        <Text style={globalStyles.subtitle}>Completa los datos para registrarte</Text>
        
        <TextInput
          style={globalStyles.input}
          placeholder="Nombre completo *"
          value={formData.nombre}
          onChangeText={(text) => updateFormData('nombre', text)}
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Correo electrónico *"
          value={formData.email}
          onChangeText={(text) => updateFormData('email', text.toLowerCase())}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Contraseña *"
          value={formData.password}
          onChangeText={(text) => updateFormData('password', text)}
          secureTextEntry
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Edad"
          value={formData.edad}
          onChangeText={(text) => updateFormData('edad', text)}
          keyboardType="numeric"
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Especialidad"
          value={formData.especialidad}
          onChangeText={(text) => updateFormData('especialidad', text)}
        />
        
        <TouchableOpacity 
          style={[globalStyles.button, loading && { opacity: 0.7 }]} 
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={globalStyles.buttonText}>
            {loading ? 'Creando cuenta...' : 'Registrarse'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={globalStyles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}