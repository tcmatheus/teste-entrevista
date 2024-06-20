import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from '../../style';
import { auth } from '../../../firebase.config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'expo-router';

const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    setLoading(true);
    try {
      let endpoint = `https://openlibrary.org/search.json?q=${query}`;

      const response = await axios.get(endpoint);
      setResults(response.data.docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentUser = auth.currentUser;
  const router = useRouter();

  if (currentUser != null) {
    // logado
  } else {
    alert('É necessário estar logado para usar este recurso');
    router.replace('/');
  };

  function logout() {
    signOut(auth)
      .then(() => {
        alert('Você desconectou-se do sistema!');
        router.replace('/');
      })
      .catch((error) => {
        const errorMessage = error.errorMessage;
        alert(errorMessage);
      });
  };


return (
  <View style={{ flex: 1, padding: 20 }}>
    <Text style={styles.h1}> Bem vindo a api de busca de livros </Text>
    <Text style={styles.h2}> Neste aplicativo você pode buscar livros por nome do livro, nome do autor ou ate mesmo por gênero</Text>
      
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
        placeholder="Digite o termo de busca"
        onChangeText={(text) => setQuery(text)}
        value={query}
      />
      
      <Button title="Buscar Livros" onPress={searchBooks} />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            ) : (
            <FlatList
              style={{ marginTop: 20 }}
              data={results}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 10 }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                  <Text>Autor(es): {item.author_name ? item.author_name.join(', ') : 'Desconhecido'}</Text>
                  <Text>Ano de Publicação: {item.first_publish_year || 'Não informado'}</Text>
                </View>
              )}
        />
      )}

      <TouchableOpacity onPress={logout} style={styles.forgotBtnArea}>
        <Text style={styles.forgotBtnText}>Deslogar</Text>
      </TouchableOpacity>

  </View>
  );
};

export default App;