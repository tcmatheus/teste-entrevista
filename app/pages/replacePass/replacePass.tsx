import { useRouter } from 'expo-router';
import { useState } from 'react';
import { styles } from '../../style';
import { ScrollView, Text, View, Image, TouchableOpacity, TextInput  } from 'react-native';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../firebase.config';


export default function ReplacePass(){

  const [emailField, setEmailField] = useState('');
  const router = useRouter();

  function replacePass(){
    if(emailField !== '') {
      sendPasswordResetEmail(auth, emailField)
        .then(() => {
          alert("Email enviado para: " + emailField +". Verifique sua caixa de email")
          router.replace('/');
        })
        .catch((error) => {
          const errorMessage = error.message;
          alert("Ops! Algum erro ocorreu. " +errorMessage +". Tente novamente ou clique em voltar ")
        })
        } else {
          alert("Informe um email valido");
          return;
        }
    }

return (
  <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.h1}> Redefinição de Senha</Text>
          
          <View style={styles.inputArea}> 
            <Text style={styles.inputLabel}>email:</Text>
            <TextInput
            style={styles.inputField} 
            placeholder="Informe seu email"
            placeholderTextColor="999"
            autoCapitalize="none"
            keyboardType="email-address"
            value={emailField}
            onChangeText={setEmailField}
            />             
          </View>

        <TouchableOpacity onPress={() => router.push("/")} style={styles.forgotBtnArea} >
          <Text style={styles.forgotBtnText}>voltar</Text>
        </TouchableOpacity>
   
        <TouchableOpacity onPress={replacePass} style={styles.button}>
          <Text style={styles.buttonText}>Mudar senha</Text>
        </TouchableOpacity>
  
          <View style={styles.footerArea}>
            <Text style={styles.footerText}>Criado por Matheus Torsoni</Text>
          </View>
  
    </View>
  </ScrollView>    
)};