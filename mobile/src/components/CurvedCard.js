import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';

const CurvedCard = ({ 
  children, 
  onPress, 
  style = {}, 
  containerStyle = {},
  shadowColor = '#000',
  shadowOpacity = 0.1,
  elevation = 8,
  curved = true,
  animated = true,
  ...props 
}) => {
  const { isRTL } = useLocalization();

  const cardStyle = [
    {
      backgroundColor: '#FFFFFF',
      borderRadius: curved ? 28 : 16,
      padding: 24,
      shadowColor,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity,
      shadowRadius: 24,
      elevation,
      transform: [{ scale: animated ? 1 : 0.98 }],
    },
    containerStyle,
  ];

  const content = (
    <View style={cardStyle} {...props}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.95}
        style={[{ transform: [{ scale: 1 }] }, style]}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={[{ transform: [{ scale: 1 }] }, style]}>
      {content}
    </View>
  );
};

export default CurvedCard;