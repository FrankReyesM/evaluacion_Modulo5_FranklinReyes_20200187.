# Heteroevaluacionm - React Native + Firebase

Aplicación móvil de gestión de usuarios con registro, login y edición de perfil.

## Funcionalidades

- Splash screen con verificación de sesión
- Registro de usuarios (nombre, email, contraseña, edad, especialidad)
- Inicio de sesión con Firebase Auth
- Home con información del usuario
- Edición de perfil
- Navegación automática basada en autenticación

## Tecnologías

- **React Native** (Expo)
- **Firebase** (Authentication + Firestore)
- **React Navigation** (Native Stack)

## Dependencias

```bash
npm install firebase
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
```

## Estructura

```
src/
├── navigation/AppNavigator.js    # Navegación principal
├── screens/                     # Pantallas de la app
├── hooks/useAuth.js             # Hook de autenticación
├── config/firebaseConfig.js     # Configuración Firebase
└── styles/globalStyles.js       # Estilos globales
```

## Configuración

1. Crear proyecto en Firebase Console
2. Habilitar Authentication (Email/Password)
3. Crear Firestore Database
4. Copiar configuración a `firebaseConfig.js`
5. `npx expo start`

## Datos de Usuario (Firestore)

- email, nombre, edad, especialidad, createdAt
- Las contraseñas se manejan en Firebase Auth (no en Firestore)

---

## Información Personal

**Nombre:** Franklin Alejandro Reyes Melgar  
**Email:** 20200187@ricaldone.edu.sv
