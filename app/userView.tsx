import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { styles } from './style';
import { auth } from './firebase.config'
import {  signOut } from 'firebase/auth';
import {  useRouter } from 'expo-router'




const App = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState('title'); // Tipo padrão de busca

  const searchBooks = async () => {
    setLoading(true);
    try {
      let endpoint = '';

      switch (searchType) {
        case 'title':
          endpoint = `https://openlibrary.org/search.json?q=${query}`;
          break;
        case 'author':
          endpoint = `https://openlibrary.org/search.json?author=${query}`;
          break;
        case 'subject':
          endpoint = `https://openlibrary.org/subjects/${query}.json`;
          break;
        default:
          break;
      }

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
    <View style={{ flex: 1, padding: 20 }}>
      <View style={{ flexDirection: 'row', marginBottom: 10 }}>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: searchType === 'title' ? 2 : 0 }}
          onPress={() => setSearchType('title')}
        >
          <Text style={{ fontWeight: 'bold', color: searchType === 'title' ? '#000' : '#888' }}>Nome</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: searchType === 'author' ? 2 : 0 }}
          onPress={() => setSearchType('author')}
        >
          <Text style={{ fontWeight: 'bold', color: searchType === 'author' ? '#000' : '#888' }}>Autor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'center', paddingVertical: 10, borderBottomWidth: searchType === 'subject' ? 2 : 0 }}
          onPress={() => setSearchType('subject')}
        >
          <Text style={{ fontWeight: 'bold', color: searchType === 'subject' ? '#000' : '#888' }}>Gênero</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
        placeholder={`Digite o ${searchType === 'subject' ? 'gênero' : 'termo de busca'}`}
        onChangeText={text => setQuery(text)}
        value={query}
      />
      <Button
        title="Buscar Livros"
        onPress={searchBooks}
      />
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


<TouchableOpacity onPress={logout} style={styles.forgotBtnArea} >
            <Text style={styles.forgotBtnText}>logar</Text>
</TouchableOpacity>
    </View>
  );
};

export default App;