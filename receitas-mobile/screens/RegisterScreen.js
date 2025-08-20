import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace('Home');
    } catch (error) {
      console.error(error);
      Alert.alert("Erro de Registro", "Não foi possível criar a conta. O e-mail pode já estar em uso ou a senha é muito fraca (mínimo 6 caracteres).");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" autoCapitalize="none" />
      <TextInput placeholder="Senha (mínimo 6 caracteres)" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title="Registrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 24, color: '#333' },
  input: { backgroundColor: 'white', height: 50, borderColor: '#ddd', borderWidth: 1, marginBottom: 15, padding: 15, borderRadius: 8 },
});

export default RegisterScreen;