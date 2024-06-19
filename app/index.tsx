import { ScrollView, Text, View, Image, TouchableOpacity, TextInput   } from 'react-native';
import React, { useState }  from 'react';
import { styles } from './style';
import { auth } from './firebase.config'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router'

export default function App() {

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');

  function userLogin() {
    signInWithEmailAndPassword( auth, emailField, passwordField)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Login Efetuado..');
        router.replace('/userView');
        console.log(user)
        
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage)
      })
  }

  function replacePass(){
    router.replace('/replacePass');
  }

  function newUser(){
    router.replace('/newUser');
  }


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
            onChangeText={setEmailField}
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
            onChangeText={setPasswordField}
          />
        </View>

        <View style={styles.aditionals}>
          <TouchableOpacity onPress={replacePass} style={styles.forgotBtnArea}>
            <Text style={styles.forgotBtnText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={userLogin} style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.signUpArea}>
          <Text style={styles.signUpText}>Não tem conta?</Text>
          <TouchableOpacity onPress={newUser}>
            <Text style={styles.signUpBtnText}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Criado por Matheus Torsoni</Text>
        </View>

      </View>
    </ScrollView>
  );
}