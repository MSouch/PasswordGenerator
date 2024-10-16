import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

type FormCheckBoxProps = {
  id: string;
  label: string;
  color: string;
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
};

const FormCheckBox: React.FC<FormCheckBoxProps> = ({ id, label, color, isChecked, onToggle }) => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        size={25}
        fillColor={color}
        unFillColor="#FFFFFF"
        text={label}
        iconStyle={{ borderColor: color }}
        innerIconStyle={{ borderWidth: 2 }}
        textStyle={{ fontFamily: 'JosefinSans-Regular', textDecorationLine: 'none' }}
        onPress={(isChecked: boolean) => onToggle(isChecked)}
        isChecked={isChecked}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default FormCheckBox;