import React from 'react';
import { TouchableOpacity, Text, View, ActivityIndicator } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';
import { Ionicons } from '@expo/vector-icons';

const CurvedButton = ({
  title,
  onPress,
  variant = 'primary',
  size = 'large',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style = {},
  textStyle = {},
  ...props
}) => {
  const { isRTL } = useLocalization();

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: disabled ? '#E5E7EB' : '#0EA5E9',
          shadowColor: '#0EA5E9',
        };
      case 'secondary':
        return {
          backgroundColor: disabled ? '#E5E7EB' : '#A855F7',
          shadowColor: '#A855F7',
        };
      case 'success':
        return {
          backgroundColor: disabled ? '#E5E7EB' : '#22C55E',
          shadowColor: '#22C55E',
        };
      case 'warning':
        return {
          backgroundColor: disabled ? '#E5E7EB' : '#F59E0B',
          shadowColor: '#F59E0B',
        };
      case 'danger':
        return {
          backgroundColor: disabled ? '#E5E7EB' : '#EF4444',
          shadowColor: '#EF4444',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? '#E5E7EB' : '#0EA5E9',
          shadowColor: '#0EA5E9',
        };
      default:
        return {
          backgroundColor: disabled ? '#E5E7EB' : '#0EA5E9',
          shadowColor: '#0EA5E9',
        };
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 16,
        };
      case 'medium':
        return {
          paddingVertical: 16,
          paddingHorizontal: 24,
          borderRadius: 20,
        };
      case 'large':
        return {
          paddingVertical: 20,
          paddingHorizontal: 32,
          borderRadius: 24,
        };
      default:
        return {
          paddingVertical: 20,
          paddingHorizontal: 32,
          borderRadius: 24,
        };
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-lg';
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') {
      return disabled ? '#9CA3AF' : '#0EA5E9';
    }
    return disabled ? '#9CA3AF' : '#FFFFFF';
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const buttonStyle = [
    {
      ...variantStyles,
      ...sizeStyles,
      flexDirection: isRTL ? 'row-reverse' : 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.3,
      shadowRadius: 12,
      elevation: 8,
      opacity: disabled ? 0.6 : 1,
    },
    fullWidth && { width: '100%' },
    style,
  ];

  const textColor = getTextColor();
  const textSize = getTextSize();

  const renderIcon = () => {
    if (loading) {
      return (
        <ActivityIndicator 
          size="small" 
          color={textColor} 
          style={{ marginHorizontal: 8 }}
        />
      );
    }
    
    if (icon) {
      return (
        <Ionicons 
          name={icon} 
          size={20} 
          color={textColor} 
          style={{ marginHorizontal: 8 }}
        />
      );
    }
    
    return null;
  };

  const renderContent = () => {
    const iconElement = renderIcon();
    
    if (isRTL) {
      return (
        <>
          <Text 
            className={`font-tajawal-bold ${textSize}`}
            style={[{ color: textColor }, textStyle]}
          >
            {title}
          </Text>
          {iconElement}
        </>
      );
    } else {
      return (
        <>
          {iconElement}
          <Text 
            className={`font-tajawal-bold ${textSize}`}
            style={[{ color: textColor }, textStyle]}
          >
            {title}
          </Text>
        </>
      );
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={buttonStyle}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

export default CurvedButton;