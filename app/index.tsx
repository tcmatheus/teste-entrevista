import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import React, { useState}  from 'react';
import { styles } from './style';

export default function App() {

  const [emailField, setEmailField] = useState<string>('');
  const [passwordField, setPasswordField] = useState<string>('');

  const handleLoginButton = () => {
    alert(emailField);
    alert(passwordField);
  }

  const handleForgetButton = () => {}

  const handleSignUpButton = () => {}

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.h1}> Sistema de Login</Text>
        <Text style={styles.h2}> Bem vindo(a)! Digite seus dados abaixo.</Text>

        <View style={styles.inputArea}> 
          <Text style={styles.inputLabel}>Email:</Text>
          <TextInput
            style={styles.inputField} 
            placeholder="Digite seu email"
            placeholderTextColor="999"
            value={emailField}
            onChangeText={t => setEmailField(t)}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputArea}> 
          <Text style={styles.inputLabel}>Senha:</Text>
          <TextInput
            style={styles.inputField} 
            placeholder="Digite sua senha"
            placeholderTextColor="999"
            secureTextEntry
            value={passwordField}
            onChangeText={t => setPasswordField(t)}
          />
        </View>

        <View style={styles.aditionals}>
          <TouchableOpacity onPress={handleForgetButton} style={styles.forgotBtnArea}>
            <Text style={styles.forgotBtnText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLoginButton} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.signUpArea}>
          <Text style={styles.signUpText}>Não tem conta?</Text>
          <TouchableOpacity onPress={handleSignUpButton}>
            <Text style={styles.signUpBtnText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>


        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Criado por Gustavo Burchardt</Text>
        </View>

      </View>
    </ScrollView>
  );
}