import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput   } from 'react-native';
import React, { useState }  from 'react';
import { styles } from './style';
import { auth } from './firebase.config'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { router, useRouter } from 'expo-router'
import { useRoute } from '@react-navigation/native';

export default function App() {


    const currentUser = auth.currentUser;
    const router = useRouter();

    if(currentUser != null ){
       //logado
    } else {
        alert('É necessario estar logado para usar este recurso')
        router.replace('/');
    }

    function logout() {
        signOut(auth)
            .then(() =>{
                alert('Voce desconetou-se do sistema!');
                router.replace('/');    
            })
            .catch((error) => {
                const errorMessage = error.errorMessage;
                alert(errorMessage);
            });
    }




  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require('./assets/logo.png')} style={styles.logo} />
        <Text style={styles.h1}> HOME </Text>
        <Text style={styles.h2}> </Text>

        

        <TouchableOpacity onPress={logout} style={styles.forgotBtnArea} >
            <Text style={styles.forgotBtnText}>logar</Text>
          </TouchableOpacity>

        

        <View style={styles.footerArea}>
          <Text style={styles.footerText}>Criado por Matheus Torsoni</Text>
        </View>

      </View>
    </ScrollView>
  );
}