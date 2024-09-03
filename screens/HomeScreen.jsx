import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [quilometragem, setQuilometragem] = useState('');
  const [litros, setLitros] = useState('');

  const theme = {
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    textColor: isDarkMode ? '#FFFFFF' : '#000000',
    buttonColor: isDarkMode ? '#6B8E23' : '#4CAF50',
    themeButtonColor: isDarkMode ? '#555555' : '#CCCCCC',
    inputBackgroundColor: isDarkMode ? '#333333' : '#F0F0F0',
  };

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleCalcular = () => {
    const kmPorLitro = parseFloat(quilometragem) / parseFloat(litros);
    navigation.navigate('Result', { kmPorLitro });
  };

  const renderInput = (label, value, onChangeText) => (
    <>
      <Text style={[styles.label, { color: theme.textColor }]}>{label}</Text>
      <TextInput
        style={[styles.input, { color: theme.textColor, backgroundColor: theme.inputBackgroundColor }]}
        keyboardType='numeric'
        value={value}
        onChangeText={onChangeText}
      />
    </>
  );

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
      {renderInput('Quilometragem (KM):', quilometragem, setQuilometragem)}
      {renderInput('Litros de Gasolina:', litros, setLitros)}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.buttonColor }]}
        onPress={handleCalcular}
      >
        <Text style={styles.buttonText}>Calcular</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default HomeScreen;
