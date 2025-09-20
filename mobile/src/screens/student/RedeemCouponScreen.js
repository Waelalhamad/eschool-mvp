import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { couponsAPI } from '../../services/api';

const RedeemCouponScreen = ({ navigation }) => {
  const [couponCode, setCouponCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRedeemCoupon = async () => {
    if (!couponCode.trim()) {
      Alert.alert('Error', 'Please enter a coupon code');
      return;
    }

    setIsLoading(true);
    try {
      const result = await couponsAPI.redeemCoupon(couponCode.trim().toUpperCase());
      Alert.alert(
        '🎉 Success!',
        `Coupon redeemed successfully!\n\nYou've unlocked ${result.unlockedCourses.length} course(s). Happy learning!`,
        [{ text: 'Start Learning', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert(
        'Redemption Failed', 
        error.response?.data?.message || 'Invalid or expired coupon code'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 justify-center px-6">
        <View className="bg-white rounded-3xl p-8 shadow-xl">
          {/* Icon and Title */}
          <View className="items-center mb-8">
            <View className="bg-gradient-to-br from-pink-500 to-purple-600 w-20 h-20 rounded-2xl items-center justify-center mb-4 shadow-lg">
              <Ionicons name="gift" size={36} color="white" />
            </View>
            <Text className="text-3xl font-bold text-gray-800 mb-2">
              Redeem Coupon
            </Text>
            <Text className="text-base text-gray-600 text-center leading-6">
              Enter your coupon code below to unlock exclusive courses and start your learning journey
            </Text>
          </View>

          {/* Input Field */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Coupon Code
            </Text>
            <TextInput
              className="border-2 border-gray-200 px-4 py-4 rounded-xl text-lg font-mono bg-gray-50 text-center tracking-widest"
              placeholder="ENTER-CODE-HERE"
              value={couponCode}
              onChangeText={(text) => setCouponCode(text.toUpperCase())}
              autoCapitalize="characters"
              placeholderTextColor="#9CA3AF"
              maxLength={20}
            />
          </View>

          {/* Redeem Button */}
          <TouchableOpacity
            className={`py-4 rounded-xl ${
              isLoading ? 'bg-primary-300' : 'bg-primary-600'
            } shadow-lg`}
            onPress={handleRedeemCoupon}
            disabled={isLoading || !couponCode.trim()}
            style={{
              shadowColor: '#3B82F6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
            }}
          >
            <Text className="text-white text-lg font-bold text-center">
              {isLoading ? 'Redeeming...' : '🎁 Redeem Coupon'}
            </Text>
          </TouchableOpacity>

          {/* Help Text */}
          <Text className="text-sm text-gray-500 text-center mt-6 leading-5">
            💡 Tip: Coupon codes are case-insensitive and can contain letters, numbers, and dashes
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
