import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { Ionicons } from '@expo/vector-icons';

const CurvedInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  multiline = false,
  numberOfLines = 1,
  error,
  success,
  disabled = false,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style = {},
  containerStyle = {},
  inputStyle = {},
  ...props
}) => {
  const { isRTL } = useLocalization();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const getBorderColor = () => {
    if (error) return '#EF4444';
    if (success) return '#22C55E';
    if (isFocused) return '#0EA5E9';
    return '#E5E7EB';
  };

  const getBackgroundColor = () => {
    if (disabled) return '#F9FAFB';
    if (isFocused) return '#FFFFFF';
    return '#F9FAFB';
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const renderLeftIcon = () => {
    if (leftIcon) {
      return (
        <View style={{ marginRight: 12 }}>
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={isFocused ? '#0EA5E9' : '#6B7280'} 
          />
        </View>
      );
    }
    return null;
  };

  const renderRightIcon = () => {
    if (secureTextEntry) {
      return (
        <TouchableOpacity onPress={togglePasswordVisibility} style={{ marginLeft: 12 }}>
          <Ionicons 
            name={showPassword ? 'eye-outline' : 'eye-off-outline'} 
            size={20} 
            color={isFocused ? '#0EA5E9' : '#6B7280'} 
          />
        </TouchableOpacity>
      );
    }
    
    if (rightIcon) {
      return (
        <TouchableOpacity onPress={onRightIconPress} style={{ marginLeft: 12 }}>
          <Ionicons 
            name={rightIcon} 
            size={20} 
            color={isFocused ? '#0EA5E9' : '#6B7280'} 
          />
        </TouchableOpacity>
      );
    }
    
    return null;
  };

  const containerStyles = [
    {
      borderWidth: 2,
      borderColor: getBorderColor(),
      backgroundColor: getBackgroundColor(),
      borderRadius: 20,
      paddingHorizontal: 20,
      paddingVertical: 16,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: multiline ? 'flex-start' : 'center',
      minHeight: multiline ? 100 : 56,
      opacity: disabled ? 0.6 : 1,
    },
    containerStyle,
  ];

  const inputStyles = [
    {
      flex: 1,
      fontSize: 16,
      color: '#1F2937',
      textAlign: isRTL ? 'right' : 'left',
      paddingVertical: 0,
    },
    inputStyle,
  ];

  return (
    <View style={[{ marginBottom: 16 }, style]}>
      {label && (
        <Text 
          style={{
            fontSize: 14,
            fontWeight: 'bold',
            color: '#374151',
            marginBottom: 8,
            textAlign: isRTL ? 'right' : 'left'
          }}
        >
          {label}
        </Text>
      )}
      
      <View style={containerStyles}>
        {renderLeftIcon()}
        
        <TextInput
          style={inputStyles}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={!disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {renderRightIcon()}
      </View>
      
      {error && (
        <Text 
          style={{
            fontSize: 14,
            color: '#EF4444',
            marginTop: 4,
            textAlign: isRTL ? 'right' : 'left'
          }}
        >
          {error}
        </Text>
      )}
      
      {success && (
        <Text 
          style={{
            fontSize: 14,
            color: '#22C55E',
            marginTop: 4,
            textAlign: isRTL ? 'right' : 'left'
          }}
        >
          {success}
        </Text>
      )}
    </View>
  );
};

export default CurvedInput;