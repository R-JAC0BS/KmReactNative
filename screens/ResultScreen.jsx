import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, useColorScheme } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { kmPorLitro } = route.params;
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  const getClassificacao = (kmPorLitro) => {
    if (kmPorLitro > 12) return 'A';
    if (kmPorLitro > 10) return 'B';
    if (kmPorLitro > 8) return 'C';
    if (kmPorLitro > 4) return 'D';
    if (kmPorLitro > 0) return 'E';
    return 'Não foi possível calcular a classificação';
  };

  const MostrarKmPorLitro = (kmPorLitro) => {
    if (kmPorLitro == null || typeof kmPorLitro !== 'number') return 'Não foi possível calcular a média de consumo';
    return kmPorLitro.toFixed(2);
  }

  const kmLitros = MostrarKmPorLitro(kmPorLitro);
  const classificacao = getClassificacao(kmPorLitro);

  const getClassificationColor = (classification) => {
    switch (classification) {
      case 'A':
      case 'B':
        return 'green';
      case 'C':
      case 'D':
        return 'yellow';
      case 'E':
        return 'red';
      default:
        return 'black';
    }
  };

  const classificationColor = getClassificationColor(classificacao);

  const theme = {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    textColor: isDarkMode ? '#FFFFFF' : '#000000',
    buttonColor: isDarkMode ? '#6B8E23' : '#4CAF50',
    themeButtonColor: isDarkMode ? '#555555' : '#CCCCCC', // New theme button color
  };

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <TouchableOpacity
        style={[styles.themeButton, { backgroundColor: theme.themeButtonColor }]}
        onPress={toggleTheme}
      >
        <Text style={[styles.themeButtonText, { color: theme.textColor }]}>
          {isDarkMode ? '☀️' : '🌙'}
        </Text>
      </TouchableOpacity>
      <Text style={[styles.resultText, { color: theme.textColor }]}>
        Média de Consumo: {kmLitros} Km/L
      </Text>
      <Text style={[styles.resultText, { color: classificationColor }]}>
        Classificação: {classificacao}
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Calcular Novamente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  resultText: {
    fontSize: 24,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  themeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    borderRadius: 20,
  },
  themeButtonText: {
    fontSize: 18,
  },
  themeSwitch: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default ResultScreen;
