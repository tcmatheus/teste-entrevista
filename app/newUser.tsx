import { ScrollView, Text, View, Image, TouchableOpacity, TextInput   } from 'react-native';
import React, { useState }  from 'react';
import { styles } from './style';
import { auth } from './firebase.config'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { router } from 'expo-router'

export default function App() {

  const [emailField, setEmailField] = useState('');
  const [passwordField, setPasswordField] = useState('');
  const [confirmationPasswordField, setConfirmationPasswordField] = useState('');

  function newUser() {
    if(emailField === '' || passwordField === '' || confirmationPasswordField === '' ){
        alert("Todos os campos devem ser preenchidos")
        return;
    }
    if(passwordField !== confirmationPasswordField){
        alert("A senhas nao são iguais")
        return;
    } else {
        createUserWithEmailAndPassword(auth, emailField, passwordField )
            .then((UserCredencial) => {
                const user = UserCredencial.user;
                alert('O usuário ' + emailField + ' foi criado com sucesso.');
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                router.replace('/');
            })
    }

  }

  function replacePass(){
    router.replace('/replacePass');
  }


  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.h1}> Criação de Usuário</Text>
        <Text style={styles.h2}> Bem vindo(a)! Digite seus dados abaixo para executar o cadastro de sua conta</Text>

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

        <View style={styles.inputArea}> 
          <Text style={styles.inputLabel}>Repita sua Senha:</Text>
          <TextInput
            style={styles.inputField} 
            placeholder="Digite sua senha"
            placeholderTextColor="999"
            secureTextEntry
            value={confirmationPasswordField}
            onChangeText={setConfirmationPasswordField}
          />
        </View>

        <View style={styles.aditionals}>
          <TouchableOpacity onPress={replacePass} style={styles.forgotBtnArea}>
            <Text style={styles.forgotBtnText} onPress={() => router.push("/")}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={newUser} style={styles.button}>
          <Text style={styles.buttonText}>Criar usuário</Text>
        </TouchableOpacity>

        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Criado por Matheus Torsoni</Text>
        </View>

      </View>
    </ScrollView>
  );
}