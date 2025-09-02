import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { globalStyles, colors } from '../styles/globalStyles';

export default function SplashScreen() {
  return (
    <View style={globalStyles.centerContainer}>
      <Text style={[globalStyles.title, { fontSize: 36, marginBottom: 24 }]}>
        UserApp
      </Text>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[globalStyles.subtitle, { marginTop: 16 }]}>
        Verificando sesión...
      </Text>
    </View>
  );
}