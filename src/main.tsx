import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import InputBox from './components/InputBox';
import FormCheckBox from './components/FormCheckBox';
import Output from './components/Output';
import Btn from './components/Btn';
import { generatePasswordString } from './utility/passwordGenerator';
import { showErrorSnackbar, showSuccessSnackBar, showInfoSnackBar } from './utility/utils';
import { PasswordRequirement, ID_UPPER_CASE_CHECKBOX, ID_LOWER_CASE_CHECKBOX, ID_SPECIAL_CHAR_CHECKBOX, ID_NUMBERS_CHECKBOX } from './utility/Consts';
import Clipboard from '@react-native-community/clipboard';

const Main: React.FC = () => {
  const [passwordLength, setPasswordLength] = useState('');
  const [includeUpper, setIncludeUpper] = useState(false);
  const [includeLower, setIncludeLower] = useState(false);
  const [includeNumber, setIncludeNumber] = useState(false);
  const [includeSymbol, setIncludeSymbol] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  const handleGeneratePassword = () => {
    if (!passwordLength || parseInt(passwordLength) < 8 || parseInt(passwordLength) > 16) {
      showErrorSnackbar('Password length must be between 8 and 16');
      return;
    }

    if (!(includeUpper || includeLower || includeNumber || includeSymbol)) {
      showErrorSnackbar('Please select at least one complexity criteria');
      return;
    }

    const passwordReq: PasswordRequirement = {
      length: parseInt(passwordLength),
      includeUpper,
      includeLower,
      includeNumber,
      includeSymbol,
    };

    const newPassword = generatePasswordString(passwordReq);
    setGeneratedPassword(newPassword);
  };

  const handleReset = () => {
    setPasswordLength('');
    setIncludeUpper(false);
    setIncludeLower(false);
    setIncludeNumber(false);
    setIncludeSymbol(false);
    setGeneratedPassword('');
    showInfoSnackBar('All fields have been reset');
  };

  const handleCopy = (password: string) => {
    if (password) {
      Clipboard.setString(password);
      showSuccessSnackBar('Password copied to clipboard');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <InputBox onChangeText={setPasswordLength} value={passwordLength} />
      <FormCheckBox
        id={ID_UPPER_CASE_CHECKBOX}
        label="Include Uppercase"
        color="#4F75FF"
        isChecked={includeUpper}
        onToggle={setIncludeUpper}
      />
      <FormCheckBox
        id={ID_LOWER_CASE_CHECKBOX}
        label="Include Lowercase"
        color="#4F75FF"
        isChecked={includeLower}
        onToggle={setIncludeLower}
      />
      <FormCheckBox
        id={ID_NUMBERS_CHECKBOX}
        label="Include Numbers"
        color="#4F75FF"
        isChecked={includeNumber}
        onToggle={setIncludeNumber}
      />
      <FormCheckBox
        id={ID_SPECIAL_CHAR_CHECKBOX}
        label="Include Symbols"
        color="#4F75FF"
        isChecked={includeSymbol}
        onToggle={setIncludeSymbol}
      />
      <Output
        generatedPassword={generatedPassword}
        placeholder="Generate Password"
        handleCopy={handleCopy}
      />
      <View style={styles.buttonContainer}>
        <Btn type={1} title="Generate Password" onPress={handleGeneratePassword} />
        <Btn type={2} title="Reset" onPress={handleReset} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default Main;