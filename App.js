import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts/1';

export default function App() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const buscarPost = async () => {
    setLoading(true);
    setErro(null);

    try {
      const response = await axios.get(API_URL);
      setPost(response.data);
    } catch (error) {
      setErro('Não foi possível carregar os dados. Verifique sua conexão e tente novamente.');
      console.log('Erro na requisição:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarPost();
  }, []);

  // Estado de carregamento
  if (loading) {
    return (
      <SafeAreaView style={styles.centralizado}>
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={styles.textoCarregando}>Carregando...</Text>
      </SafeAreaView>
    );
  }

  // Estado de erro
  if (erro) {
    return (
      <SafeAreaView style={styles.centralizado}>
        <Text style={styles.textoErro}>{erro}</Text>
        <TouchableOpacity style={styles.botao} onPress={buscarPost}>
          <Text style={styles.textoBotao}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Dados carregados
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.rotulo}>Título</Text>
        <Text style={styles.titulo}>{post.title}</Text>

        <Text style={styles.rotulo}>Conteúdo</Text>
        <Text style={styles.corpo}>{post.body}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    padding: 20,
  },
  centralizado: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  rotulo: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  corpo: {
    fontSize: 16,
    lineHeight: 24,
    color: '#374151',
  },
  textoCarregando: {
    marginTop: 12,
    fontSize: 16,
    color: '#4B5563',
  },
  textoErro: {
    fontSize: 16,
    color: '#DC2626',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});