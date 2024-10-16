import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type InputBoxProps = {
  onChangeText: (text: string) => void;
  value: string;
};

const InputBox: React.FC<InputBoxProps> = ({ onChangeText, value }) => {
  const handleTextChange = (text: string) => {
    const numericText = text.replace(/[^0-9]/g, '');
    if (numericText.length <= 2) {
      onChangeText(numericText);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={handleTextChange}
        value={value}
        keyboardType="numeric"
        maxLength={2}
        placeholder="Enter length"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

export default InputBox;