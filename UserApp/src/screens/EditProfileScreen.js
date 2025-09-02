import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { globalStyles, colors } from '../styles/globalStyles';

export default function EditProfileScreen({ navigation }) {
  const { getUserData, updateUserData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    especialidad: ''
  });

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    const data = await getUserData();
    if (data) {
      setFormData({
        nombre: data.nombre || '',
        edad: data.edad || '',
        especialidad: data.especialidad || ''
      });
    }
    setLoading(false);
  };

  const handleUpdate = async () => {
    if (!formData.nombre.trim()) {
      Alert.alert('Error', 'El nombre es obligatorio');
      return;
    }

    setSaving(true);
    const result = await updateUserData(formData);
    setSaving(false);

    if (result.success) {
      Alert.alert('Éxito', 'Perfil actualizado correctamente', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[globalStyles.subtitle, { marginTop: 16 }]}>
          Cargando tu información...
        </Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={globalStyles.container} contentContainerStyle={{ paddingVertical: 60 }}>
        <Text style={globalStyles.title}>Editar Perfil</Text>
        <Text style={globalStyles.subtitle}>Actualiza tu información personal</Text>
        
        <TextInput
          style={globalStyles.input}
          placeholder="Nombre completo"
          value={formData.nombre}
          onChangeText={(text) => updateFormData('nombre', text)}
          editable={!saving}
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Edad"
          value={formData.edad}
          onChangeText={(text) => updateFormData('edad', text)}
          keyboardType="numeric"
          editable={!saving}
        />
        
        <TextInput
          style={globalStyles.input}
          placeholder="Especialidad"
          value={formData.especialidad}
          onChangeText={(text) => updateFormData('especialidad', text)}
          editable={!saving}
        />
        
        <TouchableOpacity 
          style={[globalStyles.button, saving && { opacity: 0.7 }]} 
          onPress={handleUpdate}
          disabled={saving}
        >
          <Text style={globalStyles.buttonText}>
            {saving ? 'Guardando...' : '💾 Actualizar Perfil'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={globalStyles.buttonSecondary} 
          onPress={() => navigation.goBack()}
          disabled={saving}
        >
          <Text style={globalStyles.buttonTextSecondary}>❌ Cancelar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}